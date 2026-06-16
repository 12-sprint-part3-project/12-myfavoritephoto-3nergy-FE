//import { useMyTradeOffer } from '@/hooks/trade/useMyTradeOffer';
import { TradeOfferSection } from '@/app/(main)/marketplace/[saleId]/_components/TradeOfferSection';
import { MyTradeOfferSection } from '@/app/(main)/marketplace/[saleId]/_components/MyTradeOfferSection';

export const BuyerTradeSection = ({ sale }) => {
  //const { data: myOffer } = useMyTradeOffer(sale.saleId);

  const myOffer = true;
  return (
    <div className="flex flex-col gap-[7.5rem]">
      <TradeOfferSection sale={sale} />
      {myOffer && <MyTradeOfferSection offers={myOffer} />}
    </div>
  );
};
