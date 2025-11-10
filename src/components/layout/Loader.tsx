
export default function Loader() {
      return (
            <div className="flex items-center justify-center h-screen">
                  <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-primary-foreground rounded-full animate-bounce [animation-delay:-.4s]"></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-.6s]"></div>
                  </div>
            </div>
      )
}
