import { useState } from "react";

interface FormInputProps {
    handleSearch: (city: string, country: string) => void;
}

export const FormInput = (props: FormInputProps) => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.handleSearch(city, country);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex space-x-2">
                    <p>City:</p>
                    <input
                        type="text"
                        className="w-full border border-gray-400 rounded px-3"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <p>Country:</p>
                    <input
                        type="text"
                        className="w-full border border-gray-400 rounded px-3"
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                    />
                </div>
                <div className="space-x-2">
                    <button
                        type="submit"
                        className="border border-gray-500 rounded-sm px-2 bg-gray-200"
                    >
                        Search
                    </button>
                    <button type="button" className="border border-gray-500 rounded-sm px-2 bg-gray-200" onClick={() => [setCountry(''), setCity('')]}>Clear</button>
                </div>
            </div>
        </form>
    );
};
