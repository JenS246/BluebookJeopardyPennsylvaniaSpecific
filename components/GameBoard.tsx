import React from 'react';
import { Category } from '../types';

interface GameBoardProps {
  categories: Category[];
  answeredQuestions: string[];
  onQuestionClick: (questionId: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ categories, answeredQuestions, onQuestionClick }) => {
  return (
    <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
      <div className="grid grid-cols-5 gap-2 w-full max-w-7xl h-full max-h-[85vh] auto-rows-fr">
        {/* Headers */}
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="bg-blue-800 text-white flex items-center justify-center text-center p-2 font-display font-bold text-lg md:text-xl lg:text-2xl uppercase tracking-tighter shadow-lg border-b-4 border-black"
            style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
          >
            {cat.title}
          </div>
        ))}

        {/* Grid Cells (Transposed: Row by Row for visual grid, but data is col by col. We need to iterate 5 rows for standard jeopardy) */}
        {[0, 1, 2, 3, 4].map((rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {categories.map((cat) => {
              const question = cat.questions[rowIndex];
              const isAnswered = answeredQuestions.includes(question.id);

              return (
                <button
                  key={question.id}
                  disabled={isAnswered}
                  onClick={() => !isAnswered && onQuestionClick(question.id)}
                  className={`
                    relative flex items-center justify-center font-display font-bold text-3xl md:text-4xl shadow-md transition-transform duration-200
                    ${isAnswered ? 'bg-blue-950/50 cursor-default' : 'bg-blue-700 hover:bg-blue-600 cursor-pointer hover:scale-[1.02] hover:z-10 hover:shadow-xl'}
                  `}
                >
                  {!isAnswered && (
                    <span className="text-yellow-400 drop-shadow-md">
                      ${question.value}
                    </span>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
