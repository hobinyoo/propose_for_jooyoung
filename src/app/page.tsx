'use client'

import React, { useState } from 'react'
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Gift,
  Heart,
  Play,
} from 'lucide-react'

interface Question {
  id: number
  question: string
  icon: string
  correctAnswer: boolean
}

const ProposalQuizApp: React.FC = () => {
  const [gameState, setGameState] = useState<
    'intro' | 'quiz' | 'result' | 'gift'
  >('intro')
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showGift, setShowGift] = useState<boolean>(false)

  const questions: Question[] = [
    {
      id: 1,
      question: '선주는 매일 20분씩 서방님에게 안마를 해준다',
      icon: '💆‍♀️',
      correctAnswer: true,
    },
    {
      id: 2,
      question: '집안일은 7:3 비율로 선주가 7 호빈 3이다.',
      icon: '🧹',
      correctAnswer: true,
    },
    {
      id: 3,
      question: '치즈나 하몽이 먹고 싶을때는 선주가 벌떡 일어나서 잘라준다',
      icon: '🧀',
      correctAnswer: true,
    },
    {
      id: 4,
      question: '저녁은 매일 9첩 반상으로 선주가 차려준다.',
      icon: '🍱',
      correctAnswer: true,
    },
    {
      id: 5,
      question: '호빈이는 언제든 롤을 할 수 있는 자유가 있다.',
      icon: '🎮',
      correctAnswer: true,
    },
    {
      id: 6,
      question:
        '선주가 화가나거나 기분이 안좋을 시 호빈이가 뽀뽀하면 다 풀린다.',
      icon: '💋',
      correctAnswer: true,
    },
    {
      id: 7,
      question: '의견이 대립될시 호빈이의 의견이 우선이다.',
      icon: '👑',
      correctAnswer: true,
    },
    {
      id: 8,
      question: '이 모든 것은 종신계약이므로 평생 따라야한다.',
      icon: '📜',
      correctAnswer: true,
    },
    {
      id: 9,
      question: '사실 이건 호빈이의 꿈이고 반대로 하는게 맞다.',
      icon: '🌙',
      correctAnswer: true,
    },
  ]

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer)
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setGameState('result')
    }
  }

  const resetQuiz = () => {
    setGameState('intro')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowGift(false)
  }

  const startQuiz = () => {
    setGameState('quiz')
  }

  const openGift = () => {
    setShowGift(true)
  }

  const allCorrect = answers.every((answer) => answer === true)
  const progress =
    ((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / questions.length) *
    100

  // 인트로 화면
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-pulse">💝</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              프로포즈 선물 퀴즈
            </h1>
            <div className="bg-pink-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-bold text-pink-600">선주의 선택</span>이
                시작됩니다!
                <br />
                <br />
                자 프로포즈 선물이 뭔지 궁금하지요?
                <br />
                <br />
                그럼 다음 보기를 읽고 선택하셔야합니다.
                <br />
                <br />
                <span className="font-bold text-red-500">
                  하나라도 아니오로 선택하실 경우 안타깝지만 선물을 받으실 수
                  없습니다.
                </span>
                <br />
                <br />자 시작해볼까요?
              </p>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 active:from-pink-600 active:to-red-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            시작하기
          </button>
        </div>
      </div>
    )
  }

  // 퀴즈 화면
  if (gameState === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-medium text-gray-600">진행률</span>
              <span className="text-xs font-medium text-gray-600">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-bounce">
              {questions[currentQuestion].icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              질문 {currentQuestion + 1}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed px-2">
              {questions[currentQuestion].question}
            </p>
          </div>

          {/* Answer Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={selectedAnswer !== null}
              className={`w-full py-4 px-4 rounded-2xl font-bold text-base transition-all duration-300 transform active:scale-95 shadow-lg ${
                selectedAnswer === true
                  ? 'bg-green-500 text-white scale-105'
                  : selectedAnswer === null
                    ? 'bg-gradient-to-r from-green-400 to-green-500 active:from-green-500 active:to-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />네
              </div>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              disabled={selectedAnswer !== null}
              className={`w-full py-4 px-4 rounded-2xl font-bold text-base transition-all duration-300 transform active:scale-95 shadow-lg ${
                selectedAnswer === false
                  ? 'bg-red-500 text-white scale-105'
                  : selectedAnswer === null
                    ? 'bg-gradient-to-r from-red-400 to-red-500 active:from-red-500 active:to-red-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center">
                <XCircle className="w-5 h-5 mr-2" />
                아니오
              </div>
            </button>
          </div>

          {/* Loading indicator when answer is selected */}
          {selectedAnswer !== null && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-3 py-2 bg-gray-100 rounded-full">
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-pink-500 border-t-transparent mr-2"></div>
                <span className="text-gray-600 text-sm">다음 질문으로...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 결과 화면
  if (gameState === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex flex-col justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">✨</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              모든 선택을 완료하셨습니다!
            </h1>

            {allCorrect ? (
              <div className="bg-green-50 rounded-2xl p-6 mb-6">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-green-600 mb-4">
                  축하합니다!
                </h2>
                <p className="text-gray-700 text-sm">
                  모든 조건에 동의하셨습니다!
                  <br />
                  이제 특별한 선물을 받으실 수 있습니다.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 rounded-2xl p-6 mb-6">
                <div className="text-4xl mb-4">😢</div>
                <h2 className="text-xl font-bold text-red-600 mb-4">
                  아쉽네요!
                </h2>
                <p className="text-gray-700 text-sm">
                  하나 이상의 조건에 동의하지 않으셨습니다.
                  <br />
                  안타깝지만 선물을 받으실 수 없습니다.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {allCorrect && (
              <button
                onClick={openGift}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 active:from-yellow-500 active:to-orange-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center mb-4"
              >
                <Gift className="w-5 h-5 mr-2" />
                선물 열기
              </button>
            )}

            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 active:from-pink-600 active:to-red-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              다시 시작
            </button>
          </div>
        </div>

        {showGift && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full">
              <div className="text-center">
                <div className="text-6xl mb-4">🎁</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  축하합니다!
                </h2>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-6">
                  <img
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20241204_12%2F1733299533852qs0Lb_JPEG%2F67432369768094028_675064577.jpg&type=sc960_832"
                    alt="디올 카로백"
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h3 className="text-lg font-bold text-white mb-3">
                    디올 카로백을 드립니다.
                  </h3>
                  <p className="text-white text-sm font-medium">
                    롯데타워 디올매장에서 선물을 수령하세요.
                  </p>
                </div>
                <button
                  onClick={() => setShowGift(false)}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-full"
                >
                  <Heart className="w-4 h-4 mr-2 inline" />
                  고마워요!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default ProposalQuizApp
