import React, { useState, useMemo } from 'react';
import { GameState, Team, Question } from './types';
import { JEOPARDY_DATA, FINAL_JEOPARDY_QUESTION } from './data';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import ActiveQuestion from './components/ActiveQuestion';
import Scoreboard from './components/Scoreboard';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'SETUP',
    categories: JEOPARDY_DATA,
    teams: [],
    currentQuestionId: null,
    answeredQuestions: [],
    activeTeamId: null,
  });

  const [finalJeopardyVisible, setFinalJeopardyVisible] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Helper to get current question object
  const currentQuestion = useMemo(() => {
    if (!gameState.currentQuestionId) {
        if (gameState.phase === 'FINAL_JEOPARDY') return FINAL_JEOPARDY_QUESTION;
        return null;
    }
    for (const cat of gameState.categories) {
      const q = cat.questions.find(q => q.id === gameState.currentQuestionId);
      if (q) return q;
    }
    return null;
  }, [gameState.currentQuestionId, gameState.categories, gameState.phase]);

  // Actions
  const handleStartGame = (teams: Team[]) => {
    setGameState(prev => ({
      ...prev,
      teams,
      phase: 'BOARD'
    }));
  };

  const handleQuestionClick = (questionId: string) => {
    setGameState(prev => ({
      ...prev,
      currentQuestionId: questionId,
      phase: 'QUESTION'
    }));
  };

  const handleAwardPoints = (teamId: number, points: number) => {
    setGameState(prev => ({
      ...prev,
      teams: prev.teams.map(t => t.id === teamId ? { ...t, score: t.score + points } : t),
      answeredQuestions: [...prev.answeredQuestions, prev.currentQuestionId!],
      currentQuestionId: null,
      phase: prev.phase === 'FINAL_JEOPARDY' ? 'GAME_OVER' : 'BOARD'
    }));
  };

  const handleNoPoints = () => {
     setGameState(prev => ({
      ...prev,
      answeredQuestions: prev.currentQuestionId ? [...prev.answeredQuestions, prev.currentQuestionId] : prev.answeredQuestions,
      currentQuestionId: null,
      phase: prev.phase === 'FINAL_JEOPARDY' ? 'GAME_OVER' : 'BOARD'
    }));
  };
  
  const handleManualScoreUpdate = (teamId: number, newScore: number) => {
    setGameState(prev => ({
        ...prev,
        teams: prev.teams.map(t => t.id === teamId ? { ...t, score: newScore } : t)
    }));
  }

  const startFinalJeopardy = () => {
      setGameState(prev => ({
          ...prev,
          phase: 'FINAL_JEOPARDY',
          currentQuestionId: null // Clear active ID to allow memo to pick up final
      }));
      setFinalJeopardyVisible(true);
  };

  const confirmResetGame = () => {
        setGameState({
            phase: 'SETUP',
            categories: JEOPARDY_DATA,
            teams: [],
            currentQuestionId: null,
            answeredQuestions: [],
            activeTeamId: null,
        });
        setFinalJeopardyVisible(false);
        setShowResetConfirm(false);
  };

  // Check if all questions are answered
  const totalQuestions = useMemo(() => {
      return gameState.categories.reduce((acc, cat) => acc + cat.questions.length, 0);
  }, [gameState.categories]);

  const isBoardCleared = gameState.answeredQuestions.length >= totalQuestions;

  return (
    <div className="flex flex-col h-screen bg-blue-950 text-white overflow-hidden font-sans">
      
      {/* Header */}
      {gameState.phase !== 'SETUP' && (
        <header className="bg-blue-900 border-b border-blue-700 p-2 flex justify-between items-center shadow-lg z-20">
          <div className="flex items-center">
             <h1 className="text-xl font-display font-bold text-yellow-400 tracking-wider ml-4">
               PENNSYLVANIA BLUEBOOK JEOPARDY
             </h1>
          </div>
          
          <div className="mr-4 flex items-center gap-4">
             {isBoardCleared && gameState.phase === 'BOARD' && (
                 <button 
                    onClick={startFinalJeopardy}
                    className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-1 px-4 rounded animate-pulse"
                 >
                     START FINAL JEOPARDY
                 </button>
             )}
             
             <button
                onClick={() => setShowResetConfirm(true)}
                className="text-sm bg-red-900/80 hover:bg-red-700 text-red-100 px-4 py-2 rounded border border-red-500 transition-colors uppercase font-bold tracking-wider"
                title="Return to Home Screen"
             >
                Home
             </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {gameState.phase === 'SETUP' && (
          <StartScreen onStartGame={handleStartGame} />
        )}

        {gameState.phase === 'BOARD' && (
          <GameBoard 
            categories={gameState.categories} 
            answeredQuestions={gameState.answeredQuestions}
            onQuestionClick={handleQuestionClick}
          />
        )}

        {(gameState.phase === 'QUESTION' || gameState.phase === 'FINAL_JEOPARDY') && currentQuestion && (
          <ActiveQuestion
            question={currentQuestion}
            teams={gameState.teams}
            onClose={() => { /* Handled by point award buttons */ }}
            onAwardPoints={handleAwardPoints}
            onNoPoints={handleNoPoints}
          />
        )}

        {gameState.phase === 'GAME_OVER' && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-900 text-center p-8">
                <h2 className="text-6xl font-display text-yellow-400 mb-8">GAME OVER</h2>
                <div className="space-y-4">
                    {gameState.teams
                        .sort((a,b) => b.score - a.score)
                        .map((team, idx) => (
                            <div key={team.id} className={`p-6 rounded-lg border-2 ${idx === 0 ? 'bg-yellow-500/20 border-yellow-400' : 'bg-blue-800 border-blue-600'}`}>
                                <div className="text-2xl font-bold">{idx === 0 ? '🏆' : ''} {team.name}</div>
                                <div className="text-4xl font-display">${team.score}</div>
                            </div>
                        ))
                    }
                </div>
                <button 
                    onClick={() => setShowResetConfirm(true)}
                    className="mt-12 text-blue-300 hover:text-white underline"
                >
                    Play Again
                </button>
            </div>
        )}
        
        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-blue-900 border-2 border-red-500 p-8 rounded-lg max-w-md w-full shadow-2xl text-center">
                    <h3 className="text-2xl font-display text-white mb-4">QUIT GAME?</h3>
                    <p className="text-blue-200 mb-8">Are you sure you want to return to the home screen? All current progress and scores will be lost.</p>
                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={() => setShowResetConfirm(false)}
                            className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded font-bold"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmResetGame}
                            className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded font-bold shadow-lg"
                        >
                            Yes, Quit
                        </button>
                    </div>
                </div>
            </div>
        )}

      </main>

      {/* Footer / Scoreboard */}
      {gameState.phase !== 'SETUP' && gameState.phase !== 'GAME_OVER' && (
        <Scoreboard 
            teams={gameState.teams} 
            currentTeamId={gameState.activeTeamId} 
            setScore={handleManualScoreUpdate}
        />
      )}
    </div>
  );
};

export default App;