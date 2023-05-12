import "@/assets/css/mobile/processObserver.scss";
export function ProcessObserver({ observer }) {
  return (
    <div className="progress-observer">
      <p className="progress-observer--title font-PF-medium">流程观察者</p>
      <div className="observer-list">
        {observer.map((item, index) => (
          <div key={index} className="observer-name">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
