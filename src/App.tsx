import { useEffect, useState } from 'react';
import RankCard from './components/rankCard';
import { LEADER_BOARD_API } from './utils/apiConstants';
import { attachParams } from './utils/helpers';
import RankTable from './components/rankTable';
import Header from './components/header';

export default function App() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 20;
  const fetchApiData = async () => {
    try {
      const url = attachParams(LEADER_BOARD_API, {
        page: currentPage,
        limit: rowsPerPage,
      });
      const res = await fetch(url);
      const resData = await res.json();
      if (resData?.success) {
        setData(resData?.data?.results);
        if (currentPage === 1) {
          setTotalPages(resData?.totalPages);
          setUserData(resData?.userRank);
          const filterRanks = resData?.data?.results?.filter((r) =>
            [1, 2, 3].includes(r.rank)
          );
          setCardData([...filterRanks, resData?.userRank]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApiData();
  }, [currentPage]);
  function getMarks(data, subjectName) {
    return (
      data?.subjects?.find((s) => s?.subjectId?.title === subjectName)
        ?.totalMarkScored ?? '-'
    );
  }

  const columnData = [
    { header: 'Rank', cell: (d) => d?.rank },
    {
      header: 'Student Name',
      cell: (d) => d?.userId?.name,
      img: (d) => d?.userId?.profilePicture || '/Avatar.svg',
      width: 490,
    },
    { header: 'Overall Score', cell: (d) => d?.marksGained, maxMarks: 300 },
    { header: 'Phy', cell: (d) => getMarks(d, 'Physics') },
    { header: 'Chem', cell: (d) => getMarks(d, 'Chemistry') },
    { header: 'Maths', cell: (d) => getMarks(d, 'Mathematics') },
    { header: 'Accuracy', cell: (d) => `${d?.accuracy.toFixed(2)}%` },
  ];

  return (
    <div className="px-16 pb-4">
      <Header />
      <div className="w-full flex gap-6 justify-center">
        {cardData?.map((d, i) => (
          <RankCard
            key={i}
            profilePic={d?.userId?.profilePicture}
            name={d?.userId?.name}
            rank={d?.rank}
            overAll={d?.marksGained}
            accuracy={d?.accuracy}
            subjects={d?.subjects}
            maxMarks={300}
          />
        ))}
      </div>
      {data?.length > 0 && (
        <div>
          <RankTable
            columnData={columnData}
            data={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            userData={userData}
          />
        </div>
      )}
    </div>
  );
}
