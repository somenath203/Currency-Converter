import axios from "axios";
import { useEffect, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";

import Dropodown from "./Dropodown";


const CurrencyConverter = () => {

  const [ allCurrencies, setAllCurrencies] = useState([]);
  const [ amount, setAmount ] = useState(1);
  const [ fromCurrency, setFromCurrency ] = useState('USD');
  const [ toCurrency, setToCurrency ] = useState('INR');
  const [ convertedAmount, setConvertedAmount ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ favoriteCurrencies, setFavouriteCurrencies ] = useState(JSON.parse(localStorage.getItem('favCurrency')) || ["INR", "EUR"]);


  const fetchAllCurrencies = async () => {

    try {

        const { data } = await axios.get('https://api.frankfurter.app/currencies');

        setAllCurrencies(Object.keys(data));
         
    } catch (error) {
        
        console.log(error);

    }

  };

  useEffect(() => {
    fetchAllCurrencies();
  }, []);

  
  const convertCurrency = async () => {

    try {

        setLoading(true);

        const { data } = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);

        setConvertedAmount(data?.rates[toCurrency] + " " + toCurrency);

        setLoading(false);
        
    } catch (error) {

        setLoading(false);
        
        console.log(error);

    }
  }

  const handleFavouriteCurrencies = async (currency) => {

    let allCurrentFaavouriteCurrenciesTillNow = [...favoriteCurrencies];

    if(favoriteCurrencies.includes(currency)) {
        allCurrentFaavouriteCurrenciesTillNow = allCurrentFaavouriteCurrenciesTillNow.filter((fav) =>{
            return fav !== currency;
        })
    } else {

        allCurrentFaavouriteCurrenciesTillNow.push(currency);

    }

    setFavouriteCurrencies(allCurrentFaavouriteCurrenciesTillNow);

    localStorage.setItem('favCurrency', JSON.stringify(allCurrentFaavouriteCurrenciesTillNow));

  }


  const swapCurrencies = () => {

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

  }

  return (
    <>
      <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">


        <h2 className="mb-5 text-2xl font-semibold text-gray-700">
          Currency Converter
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">

            <Dropodown 
             currencies={allCurrencies} 
             title="From" 
             handleFavouriteCurrencies={handleFavouriteCurrencies} 
             currency={fromCurrency}
             setCurrency={setFromCurrency}
             favCurrencies={favoriteCurrencies}
            />

            <div className="flex justify-center -mb-5 sm:mb-0">
                <button 
                 onClick={swapCurrencies}
                 className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                    <HiArrowsRightLeft className="text-xl text-gray-700" />
                </button>
            </div>

            <Dropodown 
             currencies={allCurrencies} 
             title="To" 
             handleFavouriteCurrencies={handleFavouriteCurrencies}
             currency={toCurrency}
             setCurrency={setToCurrency}
             favCurrencies={favoriteCurrencies}
            />

        </div>


        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount:
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>


        <div className="flex justify-end mt-6">
          <button 
            className={`${loading ? "animate-pulse" : ""} px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            onClick={convertCurrency}
            >
            Convert
          </button>
        </div>

        {convertedAmount && <div className="mt-4 text-lg font-medium text-center text-green-600">
            Converted Amount: {convertedAmount}
        </div>}

      </div>
    </>
  );
};

export default CurrencyConverter;
