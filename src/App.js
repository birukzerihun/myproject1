import { useState } from "react"

const familyMembers = [
  {
    id: "1",
    name: "ክርስቲያን ምትኩ",
    image: "christian.jpg",
    balance: -10,
  },
  {
    id: "2",
    name: "ሲፈን ምትኩ",
    image: "sifen.jpg",
    balance: 5,
  },
  {
    id: "3",
    name: "ምትኩ አማኑእል",
    image: "tamrat.jpg",
    balance: -100,
  },
  {
    id: "4",
    name: "መስታዎት ደምሴ",
    image: "mafi.jpg",
    balance: 50,
  },
  {
    id: "5",
    name: "ብሩክ ዘሪሁን",
    image: "me.jpg",
    balance: 0,
  },
]
function App() {
  const [selectedFam, setSelectedFam] = useState(null)
  const [famMembers, setFamMembers] = useState(familyMembers)
  function handleSelection(fam) {
    setSelectedFam((cur) => (cur?.id === fam.id ? null : fam))
  }

  function handleDone(value) {
    setFamMembers((famMembers) =>
      famMembers.map((fam) =>
        fam.id === selectedFam.id
          ? { ...fam, balance: fam.balance + value }
          : fam
      )
    )
    setSelectedFam(null)
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <Logo />
        <FamlyMembers
          famMembers={famMembers}
          onSelect={handleSelection}
          selectedFam={selectedFam}
        />
      </div>
      {selectedFam && <FormNew selectedFam={selectedFam} onDone={handleDone} />}
    </div>
  )
}

function FamlyMembers({ famMembers, onSelect, selectedFam }) {
  return (
    <ul>
      {famMembers.map((fam) => (
        <Member
          fam={fam}
          key={fam.id}
          onSelect={onSelect}
          selectedFam={selectedFam}
        />
      ))}
    </ul>
  )
}

function Member({ fam, onSelect, selectedFam }) {
  const isSelected = selectedFam?.id === fam.id
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={`photos/${fam.image}`} alt={fam.name} />
      <h3>{fam.name}</h3>
      {fam.balance < 0 && (
        <p className='red'>
          አንተ የ {fam.name} {Math.abs(fam.balance)}$ አለብህ
        </p>
      )}
      {fam.balance > 0 && (
        <p className='green'>
          {fam.name} {Math.abs(fam.balance)}$ አለባት
        </p>
      )}
      {fam.balance === 0 && <p>አንተ እና {fam.name} እኩል ናችሁ!</p>}
      <Button onClick={() => onSelect(fam)}>{isSelected ? "ዝጋ" : "ምረጥ"}</Button>
    </li>
  )
}

function FormNew({ selectedFam, onDone }) {
  const [amount, setAmount] = useState("")
  const [whoIsLender, setWhoIsLender] = useState("user")
  function handleSubmit(e) {
    e.preventDefault()

    if (!amount) return
    onDone(whoIsLender === "user" ? amount : -amount)
  }
  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>
        ከ {selectedFam.name} ጋር ያለህ ሁኔታ
        {selectedFam.balance < 0 ? "👎" : "👍"}!!!
      </h2>
      <label>💵 መጠን</label>
      <input
        type='text'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <label>👫 ማበደር ወይስ መበደር </label>
      <select
        value={whoIsLender}
        onChange={(e) => setWhoIsLender(e.target.value)}
      >
        <option value='user'>ማበደር</option>
        <option value='friend'>መበደር</option>
      </select>
      <Button>ጨርስ</Button>
    </form>
  )
}

function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  )
}

function Logo() {
  return (
    <h1
      style={{
        color: "#ae3ec9",
        textTransform: "uppercase",
      }}
    >
      የ አማኑኤል ቤተሰብ ብድርና ቁጠባ ተቋም..።
    </h1>
  )
}

export default App
