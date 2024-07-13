import { useContext, useEffect, useState } from 'react';
import { AccountData, ProductTemplateProps } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import { BidContext } from '../contexts/BidContext';
import { AccountContext } from '../contexts/AccountContext';

const Product = ({ bidCard, id, title, account_id, description, price, image_url }: ProductTemplateProps) => {
  const [bidOwner, setBidOwner] = useState<AccountData | null>(null);

  const { setTargetProduct } = useContext(BidContext);
  const { account } = useContext(AccountContext);

  const myProduct = account?.id === account_id;
  
  const getAssociatedAccount = async () => {
    try {
      const url = `https://arthur-leilao-api-production.up.railway.app/api/account/${account_id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application.json'}
      });

      if (response.status === 200) {
        const data = await response.json();
        setBidOwner(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAssociatedAccount();
  }, []);

  return (
    <div className="w-[270px] h-[270px] border-2 border-stone-00 rounded-lg flex flex-col">
      {
        image_url
        ?
          <img
            className='w-full h-[120px]'
            src={image_url}
            alt="product image"
          />
        :
          <div className='h-[120px] border-b-2 flex justify-center items-center'>
            no image
          </div>
      }

      <div className='p-3 flex flex-col'>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col'>
            <h3 className='overflow-x-auto max-w-[155px] whitespace-nowrap overflow-y-hidden scrollbar-hide text-[17px]'>
              {title}
            </h3>
            <h4 className='text-sm opacity-[.7]'>seller: {bidOwner?.username ? bidOwner?.username : 'me'}</h4>
          </div>
          {!bidCard && !myProduct && <Link
            onClick={() => {
              setTargetProduct({
                bidCard: true,
                id: id,
                account_id: account_id,
                title: title,
                description: description,
                price: price,
                image_url: image_url
              });
            }}
            to="/bid"
            className='text-[14px] text-white bg-stone-600 rounded p-1 flex items-center justify-center transition duration-300 hover:bg-stone-800'>
            bid now
          </Link>}
        </div>
        <span className='text-sm opacity-[.7] mt-1'>R$ {price}</span>
        <span className='text-[14px] mt-6 break-words overflow-y-auto max-h-[57px]'>
          {description}
        </span>
      </div>
    </div>
  );
}

export default Product;
