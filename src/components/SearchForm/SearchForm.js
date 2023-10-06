import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import './SearchForm.css';

function SearchForm ({ searchMovies, onFilter, movieCheckboxStatus }) {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm({
        mode: "all",
        defaultValues: {
          search: (
            location.pathname === "/movies" ? localStorage.getItem('movie-to-search') : '')
        }
      });

      const submitData = (data) => {
        setIsLoading(true);
        searchMovies(data.search);
        setIsLoading(false);
      }
      
    return (
        <div className="search-form">
            <form onSubmit={handleSubmit(submitData)} className="search-form__container" name="search" noValidate>
                <input
                    {...register('search', {
                        required: 'Нужно ввести ключевое слово',
                        minLength: 1,
                    })}
                    className="search-form__input"
                    type="text"
                    placeholder="Фильм"
                    required
                    disabled={isLoading}
                    noValidate
                />
                <button className="search-form__button" type="submit"></button>
                {errors?.search && <span className="search-form__error">{errors?.search.message}</span>}                
            </form>
            <FilterCheckbox 
                movieCheckboxStatus={movieCheckboxStatus}
                onFilter={onFilter} />
        </div>
    )
}

export default SearchForm;