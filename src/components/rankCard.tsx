import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Ordinal } from './Ordinal';
interface Subject {
  subjectId: {
    _id: string;
    title: string;
  };
  totalMarkScored: number;
  accuracy: number;
}
interface RankCardProps {
  name: string;
  rank: number;
  subjects: Subject[];
  profilePic: string;
  overAll: number;
  accuracy: number;
  maxMarks: number;
}
function RankCard({
  name,
  rank,
  subjects,
  profilePic,
  overAll,
  accuracy,
  maxMarks,
}: RankCardProps) {
  const getCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          border: 'var(--rank1-border)',
          background: 'var(--rank1-bg)',
          rankBg: 'var(--rank1-rank-bg)',
          rankColor: 'var(--rank1-rank-color)',
        };
      case 2:
        return {
          border: 'var(--rank2-border)',
          background: 'var(--rank2-bg)',
          rankBg: 'var(--rank2-rank-bg)',
          rankColor: 'var(--rank2-rank-color)',
        };
      case 3:
        return {
          border: 'var(--rank3-border)',
          background: 'var(--rank3-bg)',
          rankBg: 'var(--rank3-rank-bg)',
          rankColor: 'var(--rank3-rank-color)',
        };
      default:
        return {
          border: 'transpaent',
          background: 'white',
          rankBg: '#f1f5f9',
          rankColor: '#000',
        };
    }
  };
  const style = getCardStyle(rank);
  return (
    <Card
      className={`rounded-t-3xl w-full h-[24.5rem] rounded-b-none border-b-0
        shadow-none ${rank <= 3 && 'border-0'} p-[2px]`}
      style={{ background: style.border }}
    >
      <div
        className="w-full h-full rounded-t-3xl"
        style={{ background: style.background }}
      >
        <div className="flex justify-center flex-col items-center gap-4 mt-6">
          <img
            src={profilePic || '/Avatar.svg'}
            alt="profile_pic"
            className="rounded-full size-16"
          />
          <CardTitle className="text-[#1D2933] font-bold">{name}</CardTitle>
          <CardDescription
            className={`rounded-2xl py-1 px-3`}
            style={{
              color: style.rankColor,
              background: style.rankBg,
            }}
          >
            <Ordinal value={rank} /> Rank
          </CardDescription>
        </div>
        <CardContent className="font-medium text-[#60748f] flex flex-col gap-4 mt-6">
          <div className="flex justify-between">
            <h3>Overall Score</h3>
            <h3 className="font-normal">
              <span className="text-[#1D2933] font-bold">{overAll}</span>/
              <span>{maxMarks}</span>
            </h3>
          </div>
          <div className="flex justify-between">
            <h3>Phy Score</h3>
            <h3>
              {
                subjects?.find((s) => s?.subjectId?.title === 'Physics')
                  ?.totalMarkScored
              }
            </h3>
          </div>
          <div className="flex justify-between">
            <h3>Chem Score</h3>
            <h3>
              {
                subjects?.find((s) => s?.subjectId?.title === 'Chemistry')
                  ?.totalMarkScored
              }
            </h3>
          </div>
          <div className="flex justify-between">
            <h3>Maths Score</h3>
            <h3>
              {
                subjects?.find((s) => s?.subjectId?.title === 'Mathematics')
                  ?.totalMarkScored
              }
            </h3>
          </div>
          <div className="flex justify-between">
            <h3>Accuracy</h3>
            <h3>{`${accuracy?.toFixed(2)}%`}</h3>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default RankCard;
