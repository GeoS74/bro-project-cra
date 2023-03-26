export default interface IObserverPattern {
  subscribe(componentKey: string, hook: React.Dispatch<React.SetStateAction<IUser | undefined>>): void
  unsubscribe(componentKey: string): void
  notify(): void
}