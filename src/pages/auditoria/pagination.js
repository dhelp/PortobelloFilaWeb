import React from 'react';

const Pagination = ({ postPerPage, totalPosts, paginate ,pp }) => {
    const pageNumber = [];

    const totapage = (Math.ceil(totalPosts / postPerPage))


    
    const previosPage = () => {

        var p;

        if (pp === 1 ) {
            p = 1 ;
        }else{
            p = pp - 1;
        }

        return p;
    } 

    const nextPage = () => {

        var p;

        if (pp === totapage ) {
            p = totapage ;
        }else{
            p = pp + 1;
        }

        return p;
    } 

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        
        if (i<=4 && pp < 4){
            pageNumber.push(i)
        
        }else if (i<=4 && pp < 5){
            pageNumber.push(i)
        }
        
    }

    console.log(pp);
    

    return (
        <div className="ui right floated pagination menu">
            <a   onClick={() => paginate(previosPage)} className="icon item">
                <i className="left chevron icon" ></i>
            </a>
            {/* {pageNumber.map(number => ( */}
            <a  className="item">Pág. {pp} de {totapage} | Total: {totalPosts}</a>
                {/* ))} */}

            <a  onClick={() => paginate(nextPage)} class="icon item">
                <i className="right chevron icon"></i>
            </a>
        </div>

    )
}

export default Pagination