import underConstruction from '../assets/under-construction.svg'

function ComingSoon() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <img
        src={underConstruction}
        alt=""
        className="w-full max-w-xs sm:max-w-md"
      />
      <p className="text-primary text-xl">This page is coming soon.</p>
    </div>
  )
}

export default ComingSoon
