export default interface IObserverPattern {
  subscribe(componentKey: string, hook: React.Dispatch<React.SetStateAction<boolean>>): void
  unsubscribe(componentKey: string): void
  notify(): void
}