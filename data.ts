import { Category, Question } from './types';

export const JEOPARDY_DATA: Category[] = [
  {
    id: 'cat-basics',
    title: 'BLUEBOOK BASICS',
    questions: [
      {
        id: 'basics-200',
        value: 200,
        clue: 'In a legal memorandum, case names should be formatted using this style.',
        answer: 'Italicized (or Underlined)',
        explanation: 'Bluebook Rule 10.2: Case names are italicized or underlined in legal documents.'
      },
      {
        id: 'basics-400',
        value: 400,
        clue: 'The specific page number referenced in a citation, often called this "cite".',
        answer: 'Pinpoint citation (or Pincite)',
        explanation: 'Example: Smith v. Jones, 123 F.3d 456, 458 (3d Cir. 1999).'
      },
      {
        id: 'basics-600',
        value: 600,
        clue: 'When a case has multiple parties listed, you should generally omit all but this one.',
        answer: 'The first listed party on each side',
        explanation: 'Rule 10.2.1(a): Do not list "et al." or multiple parties in the case name.'
      },
      {
        id: 'basics-800',
        value: 800,
        clue: 'This punctuation mark separates the court and date in the parenthetical of a standard case citation.',
        answer: 'No punctuation (space only)',
        explanation: 'Trick question! There is usually no punctuation separating court and year inside the parenthesis, just a space. E.g., (E.D. Pa. 2023).'
      },
      {
        id: 'basics-1000',
        value: 1000,
        clue: 'According to Rule 6.1(a), this spacing should be used after a period that concludes a sentence.',
        answer: 'One space',
        explanation: 'Though many older lawyers use two, The Bluebook specifies one space after periods.'
      }
    ]
  },
  {
    id: 'cat-pa-cases',
    title: 'PA STATE CASES',
    questions: [
      {
        id: 'pa-200',
        value: 200,
        clue: 'The abbreviation for the "Atlantic Reporter, Third Series".',
        answer: 'A.3d',
        explanation: 'Primary reporter for PA state appellate cases.'
      },
      {
        id: 'pa-400',
        value: 400,
        clue: 'The correct abbreviation for the "Superior Court of Pennsylvania" inside a citation parenthesis.',
        answer: 'Pa. Super.',
        explanation: 'Example: (Pa. Super. 2020).'
      },
      {
        id: 'pa-600',
        value: 600,
        clue: 'If a case is decided by the Supreme Court of Pennsylvania, this is the court abbreviation used in the parenthetical.',
        answer: 'Pa.',
        explanation: 'Example: Commonwealth v. Smith, 100 A.3d 200 (Pa. 2014).'
      },
      {
        id: 'pa-800',
        value: 800,
        clue: 'When citing a case from the Commonwealth Court of Pennsylvania, use this abbreviation.',
        answer: 'Pa. Commw.',
        explanation: 'Note the "w" in Commw.'
      },
      {
        id: 'pa-1000',
        value: 1000,
        clue: 'Public domain format citations in PA often adopt this "universal" citation format adopted by the PA Supreme Court in 2014.',
        answer: 'The public domain citation (e.g., 2014 Pa. 1)',
        explanation: 'PA adopted a vendor-neutral citation format for appellate courts.'
      }
    ]
  },
  {
    id: 'cat-fed-cases',
    title: 'FEDERAL CASES',
    questions: [
      {
        id: 'fed-200',
        value: 200,
        clue: 'The federal appellate court that sits in Philadelphia and covers PA, NJ, DE, and the Virgin Islands.',
        answer: 'Third Circuit (3d Cir.)',
        explanation: 'Cited as (3d Cir. Year).'
      },
      {
        id: 'fed-400',
        value: 400,
        clue: 'The abbreviation for the "United States District Court for the Eastern District of Pennsylvania".',
        answer: 'E.D. Pa.',
        explanation: 'Note the spacing: E.D.[space]Pa.'
      },
      {
        id: 'fed-600',
        value: 600,
        clue: 'Decisions from federal district courts are typically published in this reporter.',
        answer: 'Federal Supplement (F. Supp., F. Supp. 2d, F. Supp. 3d)',
        explanation: 'Currently in the 3rd series.'
      },
      {
        id: 'fed-800',
        value: 800,
        clue: 'This is the preferred reporter for United States Supreme Court cases.',
        answer: 'United States Reports (U.S.)',
        explanation: 'If available, cite to U.S. rather than S. Ct. or L. Ed.'
      },
      {
        id: 'fed-1000',
        value: 1000,
        clue: 'The correct ordinal format for the Third Circuit in a citation parenthetical.',
        answer: '3d Cir.',
        explanation: 'It is "3d", not "3rd".'
      }
    ]
  },
  {
    id: 'cat-statutes',
    title: 'STATUTES & RULES',
    questions: [
      {
        id: 'stat-200',
        value: 200,
        clue: 'The abbreviation "U.S.C." stands for this.',
        answer: 'United States Code',
        explanation: 'The official compilation of federal statutes.'
      },
      {
        id: 'stat-400',
        value: 400,
        clue: 'The main statutory code for Pennsylvania is abbreviated as this.',
        answer: 'Pa. Cons. Stat. (or Pa. C.S.)',
        explanation: 'Pennsylvania Consolidated Statutes.'
      },
      {
        id: 'stat-600',
        value: 600,
        clue: 'This symbol is used to denote a specific section of a statute.',
        answer: '§ (Section Symbol)',
        explanation: 'Ensure there is a space between the symbol and the number.'
      },
      {
        id: 'stat-800',
        value: 800,
        clue: 'When citing the Federal Rules of Civil Procedure, use this abbreviation.',
        answer: 'Fed. R. Civ. P.',
        explanation: 'Spaces between abbreviation groups.'
      },
      {
        id: 'stat-1000',
        value: 1000,
        clue: 'In PA, "Purdon\'s" refers to this unofficial compilation of statutes.',
        answer: 'Purdon\'s Pennsylvania Statutes (Pa. Stat. Ann.)',
        explanation: 'Often cited as Pa. Stat. and Cons. Stat. Ann. (West).'
      }
    ]
  },
  {
    id: 'cat-short',
    title: 'SHORT FORMS & SIGNALS',
    questions: [
      {
        id: 'short-200',
        value: 200,
        clue: 'This short form is used when referring to the immediately preceding authority.',
        answer: 'Id.',
        explanation: 'Italicize the period as well: Id.'
      },
      {
        id: 'short-400',
        value: 400,
        clue: 'This signal indicates that the cited authority directly states the proposition.',
        answer: '[No Signal]',
        explanation: 'If the authority directly supports the text, no signal is needed.'
      },
      {
        id: 'short-600',
        value: 600,
        clue: 'This signal means "see also" but indicates a contradiction to the stated proposition.',
        answer: 'Contra',
        explanation: 'Used when cited authority directly states the contrary of the proposition.'
      },
      {
        id: 'short-800',
        value: 800,
        clue: 'This short form usually refers to a case cited previously, but not immediately preceding (e.g., Smith, supra, at 100).',
        answer: 'Supra',
        explanation: 'Used for cases (names) or books/articles, but usually not for statutes.'
      },
      {
        id: 'short-1000',
        value: 1000,
        clue: 'This explanatory phrase explains that the emphasis in a quote was added by the author of the brief, not the original text.',
        answer: '(emphasis added)',
        explanation: 'Placed in a parenthetical after the citation.'
      }
    ]
  }
];

export const FINAL_JEOPARDY_QUESTION: Question = {
  id: 'final-jeopardy',
  value: 0,
  clue: 'In 2021, the Supreme Court of Pennsylvania adopted this rule regarding the citation of unpublished superior court memorandum opinions filed after May 1, 2019.',
  answer: 'They may be cited for their persuasive value.',
  explanation: 'Previously, unpublished opinions could not be cited. The rule change allows them to be cited for persuasive value.'
};