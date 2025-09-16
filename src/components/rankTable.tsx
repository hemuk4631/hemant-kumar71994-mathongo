import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationComponent from './paginationComponent';
import { useDeviceType } from '@/hooks/useDeviceType';
interface RankTableProps {
  columnData: unknown[];
  data: unknown[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

function RankTable({
  columnData,
  data,
  currentPage,
  setCurrentPage,
  totalPages,
}: RankTableProps) {
  const device = useDeviceType();
  return (
    <>
      <div
        className={`mt-6 flex flex-col ${
          device === 'desktop' ? 'h-[400px]' : 'h-[696px]'
        }  border rounded-xl`}
      >
        <div className="flex-1 overflow-y-auto relative">
          <Table className="table-fixed border-collapse">
            <colgroup>
              {columnData?.map((c, i) => (
                <col
                  key={i}
                  style={{
                    width: c?.width
                      ? typeof c.width === 'number'
                        ? `${c.width}px`
                        : c.width
                      : '100px',
                  }}
                />
              ))}
            </colgroup>

            <TableHeader>
              <TableRow>
                {columnData?.map((c, i) => (
                  <TableHead
                    key={i}
                    className="sticky top-0 z-20 bg-[#F5F9FE] backdrop-blur-sm border-b"
                  >
                    {c?.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columnData?.map((c, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={c?.cellClassName ?? ''}
                    >
                      <div
                        className={`${
                          c.header === 'Rank' &&
                          'bg-[#F5F9FE] w-[8px] h-[16px]  flex items-center justify-center  p-3 border border-solid rounded-full'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {c?.img && (
                            <img
                              src={c?.img(row)}
                              alt="profile"
                              className="rounded-full w-8"
                            />
                          )}

                          <span
                            className={`${
                              c.maxMarks && 'bg-[#F5F9FE] rounded-3xl px-3 py-1'
                            }`}
                          >
                            {c?.cell(row)}
                            {c.maxMarks && (
                              <span className="text-[#5B6480] text-[12px]">{`/${c?.maxMarks}`}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t p-2 bg-white">
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}

export default RankTable;
