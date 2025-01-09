import { CircularProgress } from "@mui/material"

export const Spinner = ({ className }: { className?: string }) => {
 return(
    <div className={className}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(14 116 144)" />
            <stop offset="100%" stopColor="rgb(6 182 212)" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </div>
 )
}