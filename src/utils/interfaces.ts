export interface NavBarLinkProps {
    to: string;
    title: string;
    icon: string;
}

export interface childrenProps {
    children: React.ReactNode;
}

export interface AccountProviderProps {
    children: React.ReactNode;
}

export interface AccountData {
    id: string;
    username: string;
    password: string;
}

export interface AccountDTO {
    username: string;
    password: string;
}

export interface AccountContextType {
    getAccount: () => undefined | Promise<number>;
    loginAccount: (accountDto: AccountDTO) => undefined | Promise<number>;
    signupAccount: (accountDto: AccountDTO) => undefined | Promise<number>;
    logoutAccount: () => undefined | Promise<void>;
    account: AccountData | undefined;
    setAccount: React.Dispatch<React.SetStateAction<AccountData | undefined>>;
}

export interface PopUpProps {
    text: string;
    color: string;
    margin: string;
}

export interface LogoutNavLinkProps {
    logout: () => Promise<void> | undefined;
}

export interface ProductTemplateProps {
    bidCard?: boolean;
    id?: string;
    account_id: string;
    title: string;
    description: string;
    price: number;
    image_url: string;
}

export interface ProductInputProps {
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    description: string;
    price: number;
    image_url: string;
    addProduct: () => void;
}

export interface ProductInsertedData {
    inserted_id: string;
    status: string;
}

export interface BidContextType {
    bidValue: number;
    setBidValue: React.Dispatch<React.SetStateAction<number>>;
    setTargetProduct: React.Dispatch<React.SetStateAction<ProductTemplateProps | null>>;
    targetProduct: ProductTemplateProps | null;
    setBidMessage: React.Dispatch<React.SetStateAction<string>>;
    bidMessage: string;
    addBid: () => undefined | Promise<number>;
}

export interface BidCardProps {
    account_id: string;
    title: string;
    description: string;
    price: number;
}

export interface BidData {
    account_id: string;
    product_id: string;
    bid_value: number;
    bid_message: string;
}