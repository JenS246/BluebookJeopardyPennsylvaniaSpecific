import React from 'react';
import { Team } from '../types';

interface ScoreboardProps {
  teams: Team[];
  currentTeamId: number | null;
  setScore: (teamId: number, newScore: number) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ teams, currentTeamId, setScore }) => {
  return (
    <div className="bg-black border-t-4 border-blue-600 p-4 sticky bottom-0 z-40 shadow-2xl">
      <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0">
        {teams.map((team) => (
          <div 
            key={team.id} 
            className={`
              relative bg-blue-900 border-2 rounded-lg p-3 min-w-[140px] text-center transition-all duration-300
              ${currentTeamId === team.id ? 'border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)] scale-105' : 'border-blue-700 opacity-90'}
            `}
          >
            <div className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-1 truncate px-2">{team.name}</div>
            <div className={`text-3xl font-display font-bold ${team.score < 0 ? 'text-red-400' : 'text-white'}`}>
              ${team.score}
            </div>
            
            {/* Manual Score Adjustment Controls (Small & Subtle) */}
            <div className="flex justify-center gap-2 mt-2 opacity-0 hover:opacity-100 transition-opacity">
               <button 
                onClick={() => setScore(team.id, team.score - 200)}
                className="text-xs bg-red-900/50 hover:bg-red-800 text-red-200 px-2 py-1 rounded"
               >-</button>
               <button 
                onClick={() => setScore(team.id, team.score + 200)}
                className="text-xs bg-green-900/50 hover:bg-green-800 text-green-200 px-2 py-1 rounded"
               >+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
