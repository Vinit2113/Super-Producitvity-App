
const ProgressBar = (completionRate) => {
  return (
    <>
      <div className='pt-8 max-w-30 mx-auto'>
        <div className='flex justify-between text-[8px] uppercase tracking-widest text-zinc-400 mb-2' >
          <span>Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className='h-px w-full bg-zinc-200'>
          <div className='h-px bg-zinc-900 transition-all' style={{ width: `${completionRate}%` }} />
        </div>
      </div>
    </>
  )
}

export default ProgressBar