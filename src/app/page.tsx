'use client'

import React, { useState, useEffect } from 'react'
import { RotateCcw, Gift, Heart, Play } from 'lucide-react'

type GameState =
  | 'intro'
  | 'quiz'
  | 'midResult'
  | 'preProposal'
  | 'accept'
  | 'reject'
  | 'fail'

interface Question {
  id: number
  question: string
  icon: string
}

interface FloatingItem {
  id: number
  left: number
  delay: number
  duration: number
  emoji: string
}

const questions: Question[] = [
  {
    id: 1,
    question: '주영이는 주말마다 얼굴 마사지를 정성껏 해준다.',
    icon: '💆‍♀️',
  },
  {
    id: 2,
    question:
      '주영이는 효원이와 함께 운동할 때 도망가지 않고 끝까지 같이 한다.',
    icon: '🏋️',
  },
  {
    id: 3,
    question:
      '효원이가 고기가 먹고 싶다고 하면 주영이는 군말 없이 고기를 구워준다.',
    icon: '🥩',
  },
  {
    id: 4,
    question: '효원이가 안아달라고 하면 주영이는 즉시 안아준다.',
    icon: '🧸',
  },
  {
    id: 5,
    question: '효원이가 피시방에 가고 싶다고 하면 주영이가 쿨하게 보내준다.',
    icon: '🎮',
  },
  {
    id: 6,
    question: '주영이는 화가 나 있어도 효원이가 뽀뽀하면 마음이 풀린다.',
    icon: '💋',
  },
  {
    id: 7,
    question: '중요한 선택 앞에서 주영이는 효원이의 의견도 진지하게 고려한다.',
    icon: '👑',
  },
  { id: 8, question: '위 조항들은 평생 유효하며 철회할 수 없다.', icon: '📜' },
]

const EMOJIS = ['💗', '💍', '💕', '✨', '🌹'] as const

const ProposalQuizApp: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showGift, setShowGift] = useState<boolean>(false)
  const [floating, setFloating] = useState<FloatingItem[]>([])

  useEffect(() => {
    if (gameState === 'accept') {
      const items: FloatingItem[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }))
      setFloating(items)
    }
  }, [gameState])

  const progress: number =
    ((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / questions.length) *
    100

  const handleAnswer = (answer: boolean): void => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answer)

    if (!answer) {
      setTimeout(() => setGameState('fail'), 400)
      return
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
      }, 400)
    } else {
      setTimeout(() => setGameState('midResult'), 400)
    }
  }

  const resetQuiz = (): void => {
    setGameState('intro')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowGift(false)
    setFloating([])
  }

  // ────────── INTRO ──────────
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center items-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-pulse">💝</div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              황주영에게 전하는 퀴즈
            </h1>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 mb-6 text-center">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-pink-600">주영이의 선택</span>이
              시작됩니다!
              <br />
              <br />
              프로포즈 선물이 뭔지 궁금하지요?
              <br />
              <br />
              다음 보기를 읽고 신중하게 선택하세요.
              <br />
              <br />
              <span className="font-bold text-red-500 whitespace-pre-line">
                {'하나라도 아니오를 선택하시면\n 선물을 받으실 수 없습니다.'}
              </span>
              <br />
              <br />
              자, 시작해볼까요?
            </p>
          </div>
          <button
            onClick={() => setGameState('quiz')}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 active:from-pink-600 active:to-red-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            시작하기
          </button>
        </div>
      </div>
    )
  }

  // ────────── QUIZ ──────────
  if (gameState === 'quiz') {
    const q: Question = questions[currentQuestion]
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center items-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-400">진행률</span>
              <span className="text-xs font-medium text-gray-400">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-bounce inline-block">
              {q.icon}
            </div>
            <h2 className="text-lg font-bold text-gray-700 mb-3">
              질문 {currentQuestion + 1}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed px-2">
              {q.question}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleAnswer(true)}
              disabled={selectedAnswer !== null}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2
                ${
                  selectedAnswer === true
                    ? 'bg-green-500 text-white scale-105'
                    : selectedAnswer === null
                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              ✅ 네
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={selectedAnswer !== null}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2
                ${
                  selectedAnswer === false
                    ? 'bg-red-500 text-white scale-105'
                    : selectedAnswer === null
                      ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              ❌ 아니오
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ────────── MID RESULT ──────────
  if (gameState === 'midResult') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center items-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3 animate-bounce inline-block">🎉</div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              축하합니다.
            </h1>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <p className="text-sm text-green-800 leading-loose text-center">
              모든 조건을 통과하셨습니다.
              <br />
              <br />
              마지막 확인 질문입니다.
              <br />
              정말 신중하게 선택해주세요.
            </p>
          </div>
          <button
            onClick={() => setGameState('preProposal')}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 active:from-pink-600 active:to-red-600 text-white font-bold py-4 rounded-full active:scale-95 shadow-lg transition-all duration-200 text-lg"
          >
            네
          </button>
        </div>
      </div>
    )
  }

  // ────────── PRE PROPOSAL ──────────
  if (gameState === 'preProposal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center items-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-2">
            <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-4">
              마지막 질문 💍
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-200 rounded-2xl p-8 text-center mb-6">
            <div className="text-6xl mb-5 animate-bounce inline-block">💍</div>
            <p className="text-2xl font-extrabold text-pink-700 tracking-tight">
              나랑 결혼해줄래?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setGameState('accept')}
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 active:from-pink-600 active:to-red-600 text-white font-bold py-4 rounded-full active:scale-95 shadow-lg transition-all duration-200 text-lg"
            >
              💗 응!
            </button>
            <button
              onClick={() => setGameState('reject')}
              className="flex-1 border-2 border-pink-200 text-pink-600 font-bold py-4 rounded-full active:scale-95 transition-all duration-200"
            >
              🤔 잠깐만...
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ────────── ACCEPT ──────────
  if (gameState === 'accept') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
        {floating.map((f: FloatingItem) => (
          <div
            key={f.id}
            className="fixed pointer-events-none z-10 text-2xl"
            style={{
              left: `${f.left}%`,
              bottom: -20,
              animation: `floatUp ${f.duration}s ${f.delay}s ease-in infinite`,
            }}
          >
            {f.emoji}
          </div>
        ))}

        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md z-10">
          <div className="text-center">
            <div className="text-6xl mb-3 animate-bounce inline-block">💍</div>
            <h1 className="text-2xl font-extrabold text-pink-700 mb-5">
              사랑해, 주영아!
            </h1>
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 mb-6">
              <p className="text-sm text-pink-900 leading-relaxed">
                평생 함께해줘서 고마워
                <br />
                앞으로도 잘 부탁해 💕
                <br />
                <br />널 위한 특별한 선물을 준비했어!
              </p>
            </div>
            <button
              onClick={() => setShowGift(true)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 active:from-yellow-500 active:to-orange-600 text-white font-bold py-4 rounded-full active:scale-95 shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mb-3"
            >
              <Gift className="w-5 h-5" />
              선물 열기
            </button>
            <button
              onClick={resetQuiz}
              className="w-full border-2 border-pink-200 text-pink-500 font-bold py-3 rounded-full active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              처음으로
            </button>
          </div>
        </div>

        {showGift && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full">
              <div className="text-center">
                <div className="text-5xl mb-3">🎁</div>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-5">
                  축하합니다!
                </h2>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-5 mb-5">
                  <img
                    src="/images/bag.jpeg"
                    alt="선물"
                    className="w-32 h-32 object-cover rounded-xl mx-auto mb-3"
                  />
                  <h3 className="text-white font-bold text-lg mb-2">
                    특별한 선물을 드립니다!
                  </h3>
                  <p className="text-white text-sm opacity-90">
                    롯데타워 셀린느 매장에서 선물을 수령하세요.
                  </p>
                </div>
                <button
                  onClick={() => setShowGift(false)}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-full active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  고마워요!
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    )
  }

  // ────────── REJECT ──────────
  if (gameState === 'reject') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center items-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">🥺</div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-5">
            잠깐만..?
          </h1>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">
            <p className="text-sm text-orange-900 leading-relaxed">
              프로포즈 선물이 궁금하지 않으신가요?
              <br />
              <br />
              대답하지 않으면 영원히 알 수 없습니다.
            </p>
          </div>
          <button
            onClick={() => setGameState('preProposal')}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 rounded-full active:scale-95 shadow-lg transition-all duration-200 mb-3"
          >
            💗 다시 선택하기
          </button>
          <button
            onClick={resetQuiz}
            className="w-full border-2 border-pink-200 text-pink-500 font-bold py-3 rounded-full active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            처음으로
          </button>
        </div>
      </div>
    )
  }

  // ────────── FAIL ──────────
  if (gameState === 'fail') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center items-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">😢</div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-5">
            아쉽네요!
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
            <p className="text-sm text-red-900 leading-relaxed">
              하나 이상의 조건에 동의하지 않으셨습니다.
              <br />
              <br />
              안타깝지만 선물을 받으실 수 없습니다.
            </p>
          </div>
          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 rounded-full active:scale-95 shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            다시 시작
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default ProposalQuizApp
