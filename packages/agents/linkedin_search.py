# Import required types and base agent class
from typing import Any, Dict, List, Optional
from .base import Agent
import linkedin_api
from linkedin_api import Linkedin

class LinkedInSearch(Agent):
    """Agent responsible for collecting LinkedIn profile data based on specified criteria."""

    def __init__(
        self,
        agent_id: str,
        role: str,
        vertical: str,
        experience_level: str,
        linkedin_credentials: Dict[str, str],
        name: Optional[str] = None
    ):
        # Initialize base agent and set instance variables
        super().__init__(agent_id, name)
        self.role = role
        self.vertical = vertical
        self.experience_level = experience_level
        self.linkedin_credentials = linkedin_credentials
        self.api: Optional[Linkedin] = None

    async def initialize(self) -> None:
        """Initialize LinkedIn API connection."""
        # Create LinkedIn API client with credentials
        self.api = Linkedin(
            self.linkedin_credentials["email"],
            self.linkedin_credentials["password"]
        )
        # Initialize agent state with search parameters
        self.state = {
            "role": self.role,
            "vertical": self.vertical,
            "experience_level": self.experience_level,
            "profiles_collected": []
        }

    async def process_message(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Process search requests and return matching profiles."""
        # Handle search request messages
        if message.get("type") == "search":
            profiles = await self._search_profiles(
                message.get("keywords", []),
                message.get("limit", 10)
            )
            return {
                "type": "search_results",
                "profiles": profiles
            }
        # Return error for unknown message types
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
        """Clean up API connection."""
        self.api = None

    async def _search_profiles(
        self,
        keywords: List[str],
        limit: int
    ) -> List[Dict[str, Any]]:
        """Search for profiles matching criteria."""
        # Verify API is initialized
        if not self.api:
            raise RuntimeError("LinkedIn API not initialized")
        
        # Construct search query from role, vertical, experience and keywords
        search_query = f"{self.role} {self.vertical} {self.experience_level} {' '.join(keywords)}"
        
        # Search for matching profiles
        results = self.api.search_people(
            keywords=search_query,
            limit=limit
        )
        
        # Process and format profile data
        profiles = []
        for result in results:
            # Fetch detailed profile information
            profile = self.api.get_profile(result["public_id"])
            # Format profile data into standardized structure
            profiles.append({
                "id": result["public_id"],
                "name": profile.get("firstName", "") + " " + profile.get("lastName", ""),
                "headline": profile.get("headline", ""),
                "experience": profile.get("experience", []),
                "education": profile.get("education", []),
                "skills": profile.get("skills", [])
            })
        
        # Update state with collected profiles
        self.state["profiles_collected"].extend(profiles)
        return profiles
