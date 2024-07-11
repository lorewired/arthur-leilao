import { useContext, useState } from "react"
import Container from "../components/Container"
import PopUp from "../components/PopUp"
import ProductInput from "../components/ProductInput"
import ProductTemplate from "../components/ProductTemplate"
import { AccountContext } from "../contexts/AccountContext"
import NotLogged from "../components/NotLogged"
import PageTitle from "../components/PageTitle"
import { ProductInsertedData } from "../utils/interfaces"

const AddProduct = () => {
  const [popupText, setPopupText] = useState('');
  const [popupColor, setPopupColor] = useState('');
  const [popupMargin, setPopupMargin] = useState('-200px');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);

  const { account } = useContext(AccountContext);

  const addProduct = async () => {
    const anyInvalidCredential = handlePopUp(title, description);
    if (anyInvalidCredential) return;

    try {
      const response = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          account_id: account?.id,
          description,
          price,
          image_url: image
        })
      });

      handlePopUp(title, description, response.status);

      if (response.status === 201) {
        const data: ProductInsertedData = await response.json();
        console.log(data.inserted_id)
        associateProductWithAccount(data.inserted_id);
      }
      
      setTitle('');
      setDescription('');
      setPrice(0);
      setImage('');

    } catch (e) {
      console.error(e);
    }
  }

  const associateProductWithAccount = async (id: string) => {
    try {
      if (id === '') return;

      console.log(id);

      const url = `http://localhost:3000/api/account/${account?.id}/product/${id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });

      const data = await response.json();
      console.log('status associate: ' + data);

    } catch (e) {
      console.error(e);
    }
  }

  const handlePopUp = (currentTitle: string, currentDescription: string, status?: number): boolean | void => {
    if (currentTitle.length < 3) {
      setPopupText(`Title minimun characters is 3`);
      setPopupColor('bg-orange-600');

      setPopupMargin('0');
      setTimeout(() => {
        setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
      }, 300);
      return true;
    }

    if (currentDescription.length < 3) {
      setPopupText(`Description minimun characters is 3`);
      setPopupColor('bg-orange-600');

      setPopupMargin('0');
      setTimeout(() => {
        setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
      }, 300);
      return true;
    }

    if (status === 201) {
      setPopupText(`Successfully announced`);
      setPopupColor('bg-green-500');

      setPopupMargin('0');
      setTimeout(() => {
        setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
      }, 300);
      return;
    }

    setPopupText(`Internal Error`);
    setPopupColor('bg-red-500');

    setPopupMargin('0');
    setTimeout(() => {
      setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
    }, 300);

    return;
  }

  return (
    <Container>
      {
        account
          ?
          <>
            <PopUp
              text={popupText}
              color={popupColor}
              margin={popupMargin}
            />

            <div className="w-full flex gap-40">
              <ProductInput
                setTitle={setTitle}
                setDescription={setDescription}
                setPrice={setPrice}
                setImage={setImage}
                title={title}
                description={description}
                price={price}
                image_url={image}
                addProduct={addProduct}
              />
              <ProductTemplate
                title={title}
                account_id={account?.id}
                description={description}
                image_url={image}
                price={price}
              />
            </div>
          </>
          :
          <>
            <PageTitle title="Add Product" />
            <NotLogged />
          </>
      }

    </Container>
  )
}

export default AddProduct