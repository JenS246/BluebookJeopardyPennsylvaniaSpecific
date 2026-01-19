import React, { useState } from 'react';
import { Question, Team } from '../types';

interface ActiveQuestionProps {
  question: Question;
  teams: Team[];
  onClose: () => void;
  onAwardPoints: (teamId: number, points: number) => void;
  onNoPoints: () => void;
}

const ActiveQuestion: React.FC<ActiveQuestionProps> = ({ question, teams, onClose, onAwardPoints, onNoPoints }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/95 p-4 backdrop-blur-sm">
      <div className="bg-blue-800 w-full max-w-5xl aspect-video rounded-lg shadow-2xl border-4 border-black flex flex-col overflow-hidden relative">
        
        {/* Value Badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-6 py-2 rounded-full text-yellow-400 font-display text-2xl border border-yellow-400/30">
          ${question.value}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          
          <div className="uppercase tracking-widest text-blue-300 font-display mb-8 text-xl">
            {showAnswer ? 'Correct Citation / Answer' : 'Clue'}
          </div>

          <div className={`font-serif-bluebook text-3xl md:text-4xl lg:text-5xl leading-relaxed max-w-4xl ${showAnswer ? 'text-green-300' : 'text-white'}`}>
            {showAnswer ? question.answer : question.clue.toUpperCase()}
          </div>

          {showAnswer && question.explanation && (
            <div className="mt-8 bg-blue-900/50 p-6 rounded-lg border border-blue-500/30 max-w-3xl animate-fade-in">
              <p className="text-blue-200 text-lg font-sans">
                <span className="font-bold text-yellow-400 uppercase tracking-wide mr-2">Note:</span>
                {question.explanation}
              </p>
            </div>
          )}

        </div>

        {/* Controls */}
        <div className="bg-black/40 p-6">
          {!showAnswer ? (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-12 rounded text-xl shadow-lg transition-colors font-display uppercase tracking-wider"
              >
                Reveal Answer
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-center text-blue-200 uppercase text-sm tracking-widest font-bold mb-2">Select Winner</div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => {
                      onAwardPoints(team.id, question.value);
                      onClose();
                    }}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded min-w-[120px] transition-colors shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1"
                  >
                    {team.name}
                    <span className="block text-xs font-normal opacity-75 mt-1">+${question.value}</span>
                  </button>
                ))}
                
                <div className="w-px h-12 bg-white/10 mx-2 hidden md:block"></div>

                <button
                  onClick={() => {
                    onNoPoints();
                    onClose();
                  }}
                  className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-3 px-6 rounded min-w-[120px] transition-colors shadow-lg border-b-4 border-gray-800 active:border-b-0 active:translate-y-1"
                >
                  No Correct Answer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveQuestion;
