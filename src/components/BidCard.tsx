import { useEffect, useState } from "react";
import { AccountData, BidCardProps } from "../utils/interfaces";

const BidCard = ({ account_id, product_id, bid_value, bid_message }: {account_id: string, product_id: string, bid_value: number, bid_message: string }) => {

   const [owner, setOwner] = useState<AccountData | null>(null);
   const [product, setProduct] = useState<BidCardProps | null>(null);

   const getOwner = async () => {
      try {
         const url = `https://arthur-leilao-api-production.up.railway.app/api/account/${account_id}`;
         const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
         });
         
         if (response.status === 200) {
            const data = await response.json();
            setOwner(data);
            await getProductData();
         }
      } catch (e) {
         console.error(e);
      }
   }

   const getProductData = async () => {
      try {
         const url = `https://arthur-leilao-api-production.up.railway.app/api/product/${product_id}`;
         const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
         });

         if (response.status === 200) {
            const data = await response.json();
            setProduct(data);
         }
      } catch (e) {
         console.error(e);
      }
   }

   useEffect(() => {
      getOwner();
   }, []);

   return (
      <div className="w-[300px] h-[157px] justify-center border border-stone-300 flex gap-2 flex-col py-2 px-4 rounded
      [&>div>*]:text-sm [&>*]:text-sm">
         <div>
            <p className="font-bold">{product?.title}</p>
            <p className="opacity-[.7]">{owner?.username}</p>
         </div>

         <p className="break-words overflow-y-auto max-h-[57px]">{bid_message}</p>

         <p>R$ {bid_value}</p>
      </div>
   )
}

export default BidCard