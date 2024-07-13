import { useState } from "react";
import { ProductInputProps } from "../utils/interfaces"
import PageTitle from "./PageTitle"

const ProductInput = (props: ProductInputProps) => {

   const [maxValue, setMaxValue] = useState(false);
   const [announcementType, setAnnouncementType] = useState('prata');

   const submitForm = (e: React.FormEvent<EventTarget>) => {
      e.preventDefault();
      props.addProduct();
   }

   const handleAnnouncement = (type: string) => setAnnouncementType(type);

   return (
      <div>
         <PageTitle title="Add Product" />

         <div className="flex gap-4 [&>div>*]:text-sm">

            <div
               onClick={() => handleAnnouncement('prata')}
               style={{ borderColor: announcementType === 'prata' ? 'gray' : '' }}
               className="flex flex-col items-center cursor-pointer justify-center border-2 py-2 px-4 rounded-lg"
            >
               <h3 className="text-lg">Prata</h3>
               <p className="text-sm">Taxa básica de 9,99%</p>
            </div>

            <div
               onClick={() => handleAnnouncement('ouro')}
               style={{ borderColor: announcementType === 'ouro' ? 'gray' : '' }}
               className="flex flex-col items-center cursor-pointer justify-center border-2 py-2 px-4 rounded-lg"
            >
               <h3 className="text-lg">Ouro</h3>
               <p className="text-sm">Taxa de 11,99%</p>
            </div>

            <div
               onClick={() => handleAnnouncement('diamante')}
               style={{ borderColor: announcementType === 'diamante' ? 'gray' : '' }}
               className="flex flex-col items-center cursor-pointer justify-center border-2 py-2 px-4 rounded-lg"
            >
               <h3 className="text-lg">Diamante</h3>
               <p className="text-sm">Taxa de 12,99%</p>
            </div>

         </div>

         <form
            onSubmit={submitForm}
            className="mt-10 flex flex-col gap-2"
         >

            <div className="flex flex-col gap-1">
               <label htmlFor="title" className="text-md ml-1">Title</label>
               <input
                  onChange={e => props.setTitle(e.target.value)}
                  value={props.title}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] transition duration-300 focus:bg-gray-300"
                  type="text"
                  id="title"
                  placeholder="title"
                  required
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="description" className="text-md ml-1">Description</label>
               <input
                  onChange={e => props.setDescription(e.target.value)}
                  value={props.description}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] transition duration-300 focus:bg-gray-300"
                  type="text"
                  id="description"
                  placeholder="description"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="price" className="text-md ml-1">Price</label>
               <input
                  onChange={e => {
                     const v = Number(e.target.value);
                     if (v > 1000000) {
                        setMaxValue(true);
                        return;
                     }
                     setMaxValue(false);
                     props.setPrice(Number(e.target.value));
                  }}
                  value={props.price.toString()}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] transition duration-300 focus:bg-gray-300"
                  type="number"
                  min="1"
                  max="1000"
                  id="price"
                  placeholder="price"
                  required
               />
               <p className="text-red-500 text-sm">{maxValue ? 'price limit: R$ 1.000.000' : ''}</p>
            </div>

            <div className="flex flex-col gap-1">
               <label
                  className="text-md ml-1"
                  htmlFor="image"
               >
                  Image url
               </label>
               <input
                  onChange={e => props.setImage(e.target.value)}
                  value={props.image_url}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] transition duration-300 focus:bg-gray-300"
                  type="text"
                  id="image"
                  placeholder="url"
               />
            </div>

            <input
               className="w-[300px] bg-gray-200 mt-2 cursor-pointer rounded-lg py-1 transition duration-300 hover:bg-gray-300"
               type="submit"
               value="Add"
            />

         </form>
      </div>
   )
}

export default ProductInput