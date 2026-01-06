import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

// 午餐選項資料
const lunchOptions = [
  // 原有選項
  { name: '拉麵', emoji: '🍜' },
  { name: '壽司', emoji: '🍣' },
  { name: '咖哩飯', emoji: '🍛' },
  { name: '烏龍麵', emoji: '🍜' },
  { name: '丼飯', emoji: '🍱' },
  { name: '便當', emoji: '🍱' },
  { name: '關東煮', emoji: '🍢' },
  { name: '章魚燒', emoji: '🐙' },
  { name: '天婦羅', emoji: '🍤' },
  { name: '日式定食', emoji: '🍽️' },

  // 麵類
  { name: '牛肉麵', emoji: '🍜' },
  { name: '炸醬麵', emoji: '🍜' },
  { name: '韓式冷麵', emoji: '🍜' },
  { name: '義大利麵（白醬 / 紅醬）', emoji: '🍝' },

  // 飯類
  { name: '滷肉飯', emoji: '🍚' },
  { name: '雞肉飯', emoji: '🍚' },
  { name: '韓式拌飯（石鍋拌飯）', emoji: '🍛' },
  { name: '天丼（炸蝦丼飯）', emoji: '🍤' },

  // 漢堡 / 三明治類
  { name: '起司牛肉堡', emoji: '🍔' },
  { name: '炸雞堡', emoji: '🍔' },
  { name: '俱樂部三明治', emoji: '🥪' },
  { name: '墨西哥捲餅（Burrito）', emoji: '🌯' },

  // 披薩
  { name: '比薩（夏威夷 / 瑪格麗特）', emoji: '🍕' },

  // 特殊選項
  { name: '土', emoji: '🕳️' },
  { name: '大便', emoji: '💩' },
]

function App() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedLunch, setSelectedLunch] = useState(null)
  const [hasFlipped, setHasFlipped] = useState(false)
  const [history, setHistory] = useState([])

  const handleCardClick = () => {
    if (!isFlipped && !hasFlipped) {
      // 隨機選擇一個午餐選項
      const randomIndex = Math.floor(Math.random() * lunchOptions.length)
      const selected = lunchOptions[randomIndex]
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      
      setSelectedLunch(selected)
      setIsFlipped(true)
      setHasFlipped(true)
      setHistory((prev) => [{ ...selected, time: timeString }, ...prev].slice(0, 3))

      // 觸發 Confetti 特效
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'],
      })
    }
  }

  const handleReset = () => {
    setIsFlipped(false)
    setSelectedLunch(null)
    setHasFlipped(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* 標題 */}
      <h1 className="text-4xl font-light text-center mb-8 text-gray-700 tracking-wider">
        午餐抽卡機
      </h1>
      
      {/* 卡牌區域 - 使用 flex 確保完全置中 */}
      <div className="flex items-center justify-center w-full">
        <div className="perspective-1000">
          <div
            className={`card-container ${isFlipped ? 'flipped' : ''}`}
            onClick={handleCardClick}
          >
            {/* 卡牌背面 */}
            <div className="card-back absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 rounded-[28px] shadow-xl cursor-pointer transition-transform duration-500 flex items-center justify-center card-surface">
              <div className="text-center">
                <div className="text-6xl mb-4">🎴</div>
                <div className="text-gray-600 text-lg font-light">點擊翻牌</div>
              </div>
            </div>

            {/* 卡牌正面 */}
            <div className="card-front absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-[28px] shadow-xl flex flex-col items-center justify-between p-6 pt-16 pb-10 transform rotate-y-180 overflow-hidden card-surface">
              {selectedLunch && (
                <div className="text-center relative z-10 w-full flex flex-col items-center h-full justify-between gap-6">
                  <div className="emoji-large animate-bounce-slow flex-shrink-0 mt-2">{selectedLunch.emoji}</div>
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <div className="text-2xl font-light text-gray-700 mb-2">{selectedLunch.name}</div>
                    <div className="text-xs text-gray-500">今天午餐就決定是你了！</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 歷史紀錄 - 橫向滾動卡片 */}
      {history.length > 0 && (
        <div className="history-strip-wrapper">
          <div className="history-strip">
            {history.map((item, index) => (
              <div key={index} className="history-card">
                <div className="history-emoji">{item.emoji}</div>
                <div className="history-meta">
                  <div className="history-name">{item.name}</div>
                  <div className="history-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 按鈕區域 */}
      {hasFlipped && (
        <div className="mt-12 w-full max-w-md flex justify-center retry-button-wrapper">
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-white/80 hover:bg-white text-gray-700 rounded-lg shadow-md transition-all duration-300 font-light text-lg border border-gray-200/50"
          >
            再抽一次
          </button>
        </div>
      )}
    </div>
  )
}

export default App
