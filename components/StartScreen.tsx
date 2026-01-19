import React, { useState } from 'react';
import { Team } from '../types';

interface StartScreenProps {
  onStartGame: (teams: Team[]) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [teamNames, setTeamNames] = useState<string[]>(['Team 1', 'Team 2']);

  const addTeam = () => {
    if (teamNames.length < 4) {
      setTeamNames([...teamNames, `Team ${teamNames.length + 1}`]);
    }
  };

  const removeTeam = (index: number) => {
    if (teamNames.length > 1) {
      const newNames = [...teamNames];
      newNames.splice(index, 1);
      setTeamNames(newNames);
    }
  };

  const updateName = (index: number, name: string) => {
    const newNames = [...teamNames];
    newNames[index] = name;
    setTeamNames(newNames);
  };

  const handleStart = () => {
    const teams: Team[] = teamNames.map((name, index) => ({
      id: index,
      name,
      score: 0
    }));
    onStartGame(teams);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8">
      <div className="bg-blue-800/50 p-10 rounded-xl shadow-2xl border border-blue-500/30 max-w-2xl w-full text-center backdrop-blur-sm">
        <h1 className="text-5xl font-display font-bold mb-2 text-yellow-400 tracking-wider">BLUEBOOK JEOPARDY</h1>
        <p className="text-blue-200 mb-8 font-serif-bluebook italic text-lg">Pennsylvania Paralegal Edition</p>
        
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-blue-300">Enter Teams</h2>
          {teamNames.map((name, idx) => (
            <div key={idx} className="flex gap-2 justify-center">
              <input
                type="text"
                value={name}
                onChange={(e) => updateName(idx, e.target.value)}
                className="bg-blue-950 border border-blue-600 rounded px-4 py-2 text-center text-lg w-64 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                placeholder="Team Name"
              />
              {teamNames.length > 1 && (
                <button 
                  onClick={() => removeTeam(idx)}
                  className="bg-red-500/20 hover:bg-red-500/50 text-red-200 px-3 rounded border border-red-500/30 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          {teamNames.length < 4 && (
            <button 
              onClick={addTeam}
              className="text-sm text-blue-300 hover:text-white underline decoration-dashed underline-offset-4"
            >
              + Add Another Team
            </button>
          )}
        </div>

        <button
          onClick={handleStart}
          className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-4 px-12 rounded-lg text-2xl shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transform hover:-translate-y-1 transition-all duration-200 font-display"
        >
          START GAME
        </button>
      </div>
    </div>
  );
};

export default StartScreen;