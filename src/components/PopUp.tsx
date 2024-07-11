import { PopUpProps } from "../utils/interfaces"

const PopUp = ({ text, color, margin }: PopUpProps) => {
  return (
    <div style={{transition: '.3s all'}} className={`${color} ${margin} text-white py-2 px-8 rounded-lg absolute right-[100px] top-[100px] w-[400px] h-[45px] text-center`}>
        {text}
    </div>
  )
}

export default PopUp