from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional

class Agent(ABC):
    """Base abstract class for all agents in the multiagent framework."""
    
    def __init__(self, agent_id: str, name: Optional[str] = None):
        self.agent_id = agent_id
        self.name = name or agent_id
        self.state: Dict[str, Any] = {}
        
    @abstractmethod
    async def initialize(self) -> None:
        """Initialize the agent's resources and state."""
        pass
        
    @abstractmethod
    async def process_message(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Process incoming messages and return a response."""
        pass
        
    @abstractmethod
    async def get_state(self) -> Dict[str, Any]:
        """Return the current state of the agent."""
        pass
        
    @abstractmethod
    async def update_state(self, new_state: Dict[str, Any]) -> None:
        """Update the agent's state with new information."""
        pass
        
    @abstractmethod
    async def cleanup(self) -> None:
        """Clean up any resources used by the agent."""
        pass
