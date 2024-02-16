import { DBProblem, Problem } from "@/utils/problems/types/types";
import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import RectangleSkeleton from "../skeletons/RectangleSkeleton";
import CircleSkeleton from "../skeletons/CircleSkeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
type Props = {
  problem: Problem;
};

const ProblemDescription: React.FC<Props> = ({ problem }) => {
  const [user] = useAuthState(auth);
  const { currProblem, loading, probDifficultyClass } = useGetCurrentProblem(
    problem?.id
  );

  const { liked, disliked, starred, solved } = useGetUsersDataOnProblem(
    problem?.id
  );

  const handleLike = async () => {
    if (!user) {
      toast.error("please Login first", { theme: "dark" });
      return;
    }
  };

  return (
    <div className="bg-dark-layer-1">
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={`bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer`}
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto overflow-x-hidden">
        <div className="px-5">
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem?.title}
              </div>
            </div>

            {!loading && currProblem && (
              <div className="flex items-center mt-3">
                <div
                  className={`${probDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
                >
                  {currProblem?.difficulty}
                </div>

                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>
                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                  onClick={handleLike}
                >
                  {liked && <AiFillLike className="text-dark-blue-s" />}
                  {!liked && <AiFillLike />}
                  <span className="text-xs">{currProblem?.likes}</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                  <AiFillDislike />
                  <span className="text-xs">{currProblem?.dislikes}</span>
                </div>
                <div className="cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6">
                  <TiStarOutline />
                </div>
              </div>
            )}
            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}

            {/* {'problem title para'} */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: problem?.problemStatement,
                }}
              />
            </div>
            {/* {'examples'} */}

            <div className="mt-4">
              {problem?.examples.map((ex, i) => {
                return (
                  <div key={i}>
                    <p className="font-medium text-white">Example {i + 1}: </p>
                    {ex.img && (
                      <img src={ex.img} alt="" className="mt-3 rounded" />
                    )}
                    <div className="example-card">
                      <pre>
                        <strong className="text-white">Input:</strong>{" "}
                        {ex.inputText} <br />
                        <strong>Output: </strong>
                        {ex.outputText} <br />
                        {ex.explanation && (
                          <>
                            <strong>Explanation:</strong> {ex.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* {Constrains} */}

            <div className="my-7">
              <div className="text-white text-sm font-medium">Constrains:</div>
              <ul className="text-white ml-5 list-disc my-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: problem?.constraints,
                  }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

export function useGetCurrentProblem(problemId: string) {
  const [currProblem, setCurrProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState(true);
  const [probDifficultyClass, setProbDifficultyClass] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (problemId) {
        const docRef = doc(firestore, "problems", problemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let pr = docSnap.data();
          setCurrProblem({ id: docSnap.id, ...pr } as DBProblem);

          setProbDifficultyClass(
            pr.difficulty === "Easy"
              ? "bg-olive text-olive"
              : pr.difficulty === "Medium"
              ? "bg-dark-yellow text-dark-yellow"
              : "bg-dark-pink text-dark-pink"
          );
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [problemId]);

  return { currProblem, loading, probDifficultyClass };
}

export function useGetUsersDataOnProblem(id: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(id),
          disliked: likedProblems.includes(id),
          starred: likedProblems.includes(id),
          solved: likedProblems.includes(id),
        });
      }
    };
    if (user) getUsersDataOnProblem();
    return () => {
      setData({ liked: false, disliked: false, starred: false, solved: false });
    };
  }, [id, user]);

  return { ...data, setData };
}
