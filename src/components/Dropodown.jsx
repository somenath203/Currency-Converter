/* eslint-disable react/prop-types */
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const Dropodown = ({ currencies, currency, setCurrency, favCurrencies, handleFavouriteCurrencies, title="" }) => {

  const isFavouriteCurrencyThenChangeTheColorOfTheStar = (currentCurrency) => {

    return favCurrencies?.includes(currentCurrency);

  };

  return (
    <>
        <div>

            <label htmlFor={title} className="block text-sm font-medium text-gray-700">{title}</label>

            <div className="mt-1 relative">

                <select
                  value={currency}  
                  onChange={(e) => setCurrency(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">

                    {favCurrencies?.map((favcurr) => {
                        return <option className="bg-gray-200" value={favcurr} key={favcurr}>{favcurr}</option>
                    })}

                    <hr />

                    {currencies?.filter((c => !favCurrencies.includes(c)))?.map((curr) => {
                        return <option value={curr} key={curr}>{curr}</option>
                    })}
                </select>

                <button 
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
                    onClick={() => handleFavouriteCurrencies(currency)}
                >
                    {isFavouriteCurrencyThenChangeTheColorOfTheStar(currency) ? <HiStar /> : <HiOutlineStar />}

                </button>

            </div>

        </div>
    </>
  )
};

export default Dropodown;