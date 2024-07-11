import { ProductTemplateProps } from "../utils/interfaces"

const ProductTemplate = (props: ProductTemplateProps) => {
   return (
      <div className="p-14">
         <div
            className="w-[270px] h-[270px] border-2 border-stone-00 rounded-lg flex flex-col product-card">
            {
               props.image_url === ''
               ?
                  <div
                     className='w-full h-[120px] flex items-center justify-center border-b'
                  >
                     no image
                  </div>
               :
               <img
                  className='w-full h-[120px]'
                  src={props.image_url}
                  alt="product image"
               />
            }

            <div className='p-3 flex flex-col'>
               <div className='flex w-full justify-between'>
                  <h3 className='pb-2 overflow-x-auto max-w-[155px] whitespace-nowrap overflow-y-hidden scrollbar-hide text-[17px]'>{props.title ? props.title : 'title'}</h3> {/* product name */}
                  <button className='text-[14px] cursor-no-drop text-white bg-stone-600 rounded p-1 flex items-center justify-center'>bid now</button>
               </div>
               <span className='text-sm opacity-[.7] mt-1'>R$ {props.price ? props.price : 0}</span> {/* price */}
               <span className='text-[14px] mt-6 break-words overflow-y-auto max-h-[57px]'>{props.description ? props.description : 'description...'}</span> {/* description */}
            </div>
         </div>
      </div>
   )
}

export default ProductTemplate