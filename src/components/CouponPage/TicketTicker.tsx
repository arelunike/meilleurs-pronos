// components/TicketTicker.js
export default function TicketTicker() {
  const tickerItems = [
    '1XBET',
    'MELBET',
    'LINEBET',
    '888STARZ',
  ]

  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <span key={idx} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </div>
    </div>
  )
}