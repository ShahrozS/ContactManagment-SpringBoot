import { Dispatch, SetStateAction } from "react";
import "./Pagination.css";

interface pageinationProps {
  totalPosts: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}: pageinationProps) => {
  let pages: any = [];
  for (var i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page: number, index: number) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
