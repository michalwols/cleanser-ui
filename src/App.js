import React, { useState } from 'react'
import './App.css'

const texts = [
  'Winnti is a highly complex structure that is difficult to penetrate. The term denotes both a sophisticated malware and an actual group of hackers. IT security experts like to call them digital mercenaries. Since at least 2011, these hackers have been using malware to spy on corporate networks. Their mode of operation: to collect information on the organizational charts of companies, on cooperating departments, on the IT systems of individual business units, and on trade secrets, obviously.',

  'Asked about the group an IT security expert who has been analyzing the attacks for years replies, tongue in cheek: “Any DAX corporation that hasn’t been attacked by Winnti must have done something wrong.” A high-ranking German official says: “The numbers of cases are mind-boggling.” And claims that the group continues to be highly active—to this very day. The official’s name will remain undisclosed, as will names of the more than 30 people whom we were able to interview for this article: Company staff, IT security experts, government officials, and representatives of security authorities. They are either not willing or not allowed to speak frankly. But they are allowed to reveal some of their tactics.',

  'This allows us to find the software and to figure out for ourselves how the attackers work. Thanks to the help received from the informers, we, the reporters, are able to get on to the group. Part of their trail is the following code: daa0 c7cb f4f0 fbcf d6d1.',

  'Logging:',

  'The hackers’ individual steps are stored in log files.',

  'Modern-day espionage operations have one big advantage: Instead of painstakingly planting agents in companies, digital spies are simply sending prepared emails. Instead of taking pictures of confidential documents while the rest of the staff is out to lunch, hackers can remotely log on to company computers and send their commands from their keyboard. But every hacking operation also comes with a huge drawback. It leaves digital traces. If you notice hackers, you can log their every step. The hackers themselves have no clue that they are under meticulous scrutiny, sometimes even for months at a time.',

  'To decipher the traces of hackers, you need to take a closer look at the program code of the malware itself. It can be found in databases operated by private companies like “Virustotal.” The company is owned by Google and is a kind of malware search engine. The information stored in that database is so valuable to IT consultants and security companies that they pay thousands of Euros per month for accessing it. Anybody who is unsure whether a mail attachment contains a Trojan can have it checked in that database by more than 50 antivirus programs. In return, Virustotal stores the file with the aid of a digital fingerprint. This digital fingerprint allows others to search for the file and to analyze the codes it contains. People like ourselves.'
]


class Data {
  constructor(raw, { id, timeCreated, timeModified } = {}) {
    this.id = id
    this.raw = raw
    this.timeCreated = timeCreated
    this.timeModified = timeModified
  }
}

class TextDoc {
  constructor() {
    this.id = ''
    this.raw = ''
    this.annotations = []
    this.suggestions = []
    this.attributes = {}
  }

  static fromSpacy() {

  }
}

class Audio {}

class Image {}

const tokenize = text => text.split(' ')

const Tag = ({children}) => <span className={'tag'}>{children}</span>

export const Segment = ({ children, tags=[] } = {}) => {
  const [selected, setSelected] = useState(false)

  return (
    <span
      className={`segment ${selected ? 'selected' : ''} ${tags.length ? 'tagged' : ''}`}
      onClick={() => setSelected(!selected)}>
      {children}
      {tags.map(tag => <Tag>{tag}</Tag>)}
    </span>
  )
}

const Text = ({ children }) => (
  <div
    className={'text'}
    style={{
      maxWidth: '30em',
      padding: 12,
      margin: 20,
      borderBottom: '1px solid #666',
      lineHeight: '2em'
    }}>
    {tokenize(children).map(t => (
      <Segment tags={t.includes('an') ? ['an'] : []}>{t} </Segment>
    ))}
  </div>
)

function App() {
  const [query, updateQuery] = useState('')

  return (
    <div className="App">
      <div className={'search'}>
      <input
        placeholder={'search...'}
        className={'search-input'}
        type="text"
        value={query}
        onChange={e => updateQuery(e.target.value)}
      />
      </div>

      <div style={{ margin: '0 auto' }}>
        {texts
          .filter(t => (query.length ? t.toLowerCase().includes(query) : true))
          .map(t => (
            <Text>{t}</Text>
          ))}
      </div>
    </div>
  )
}

export default App
