from typing import Any, Dict, List, Optional
from .base import Agent
import aiohttp
import asyncio
from datetime import datetime

class ListBuilder(Agent):
    """Agent responsible for building lists of candidate profiles from multiple sources."""

    def __init__(
        self,
        agent_id: str,
        role: str,
        vertical: str,
        experience_level: str,
        api_credentials: Dict[str, Dict[str, str]],
        name: Optional[str] = None
    ):
        super().__init__(agent_id, name)
        self.role = role
        self.vertical = vertical
        self.experience_level = experience_level
        self.api_credentials = api_credentials
        self.session: Optional[aiohttp.ClientSession] = None

    async def initialize(self) -> None:
        """Initialize API connections and agent state."""
        self.session = aiohttp.ClientSession()
        self.state = {
            "role": self.role,
            "vertical": self.vertical,
            "experience_level": self.experience_level,
            "profiles_collected": [],
            "last_updated": datetime.now().isoformat()
        }

    async def process_message(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Process search requests and return matching profiles."""
        if message.get("type") == "search":
            profiles = await self._search_profiles(
                message.get("keywords", []),
                message.get("limit", 10)
            )
            return {
                "type": "search_results",
                "profiles": profiles
            }
        return {
            "type": "error",
            "message": "Unknown message type"
        }

    async def get_state(self) -> Dict[str, Any]:
        """Return current agent state."""
        return self.state

    async def update_state(self, new_state: Dict[str, Any]) -> None:
        """Update agent state."""
        self.state.update(new_state)

    async def cleanup(self) -> None:
        """Clean up API connections."""
        if self.session:
            await self.session.close()
            self.session = None

    async def _search_profiles(
        self,
        keywords: List[str],
        limit: int
    ) -> List[Dict[str, Any]]:
        """Search for profiles across multiple platforms."""
        if not self.session:
            raise RuntimeError("API session not initialized")
        search_query = f"{self.role} {self.vertical} {self.experience_level} {' '.join(keywords)}"
        tasks = [
            self._search_github(search_query, limit),
            self._search_linkedin(search_query, limit),
            self._search_stackoverflow(search_query, limit)
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        all_profiles = []
        for platform_results in results:
            if isinstance(platform_results, list):
                all_profiles.extend(platform_results)
        self.state["profiles_collected"].extend(all_profiles)
        self.state["last_updated"] = datetime.now().isoformat()
        return all_profiles[:limit]

    async def _search_github(self, query: str, limit: int) -> List[Dict[str, Any]]:
        """Search GitHub profiles."""
        headers = {
            "Authorization": f"token {self.api_credentials['github']['token']}",
            "Accept": "application/vnd.github.v3+json"
        }
        async with self.session.get(
            f"https://api.github.com/search/users?q={query}&per_page={limit}",
            headers=headers
        ) as response:
            if response.status != 200:
                return []
            data = await response.json()
            profiles = []
            for user in data.get("items", []):
                profiles.append({
                    "id": user["id"],
                    "name": user["login"],
                    "platform": "github",
                    "url": user["html_url"],
                    "score": user["score"]
                })
            return profiles

    async def _search_linkedin(self, query: str, limit: int) -> List[Dict[str, Any]]:
        """Search LinkedIn profiles."""
        headers = {
            "Authorization": f"Bearer {self.api_credentials['linkedin']['token']}",
            "Content-Type": "application/json"
        }
        async with self.session.get(
            f"https://api.linkedin.com/v2/people-search?q={query}&count={limit}",
            headers=headers
        ) as response:
            if response.status != 200:
                return []
            data = await response.json()
            profiles = []
            for person in data.get("elements", []):
                profiles.append({
                    "id": person["id"],
                    "name": f"{person.get('firstName', '')} {person.get('lastName', '')}",
                    "platform": "linkedin",
                    "url": person.get("publicProfileUrl", ""),
                    "headline": person.get("headline", "")
                })
            return profiles

    async def _search_stackoverflow(self, query: str, limit: int) -> List[Dict[str, Any]]:
        """Search Stack Overflow profiles."""
        params = {
            "key": self.api_credentials["stackoverflow"]["key"],
            "site": "stackoverflow",
            "q": query,
            "pagesize": limit
        }
        async with self.session.get(
            "https://api.stackexchange.com/2.3/users/search",
            params=params
        ) as response:
            if response.status != 200:
                return []
            data = await response.json()
            profiles = []
            for user in data.get("items", []):
                profiles.append({
                    "id": user["user_id"],
                    "name": user["display_name"],
                    "platform": "stackoverflow",
                    "url": user["link"],
                    "reputation": user["reputation"]
                })
            return profiles
