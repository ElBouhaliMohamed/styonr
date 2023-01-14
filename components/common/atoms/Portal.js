import ReactDOM from 'react-dom';

export default function Portal({ children, nodeID }) {
  if(!process.browser) {
    return <div></div>
  }
  const node = document.getElementById(nodeID)
  return ReactDOM.createPortal(
    children,
    node
  )
}