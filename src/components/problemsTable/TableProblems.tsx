import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/problems/types/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableProblems: React.FC<Props> = ({ setLoading }) => {
  const problems = useGetProblems(setLoading);

  return (
    <tbody className="text-white">
      {problems.map((doc, i) => {
        const diffColor =
          doc.difficulty == "Easy"
            ? "text-dark-green-s"
            : doc.difficulty === "Medium"
            ? "text-dark-yellow"
            : "text-dark-pink";
        return (
          <tr className={`${i % 2 == 1 ? "bg-dark-layer-1" : ""}`} key={doc.id}>
            <th className="px-2 py-3 font-medium whitespace-nowrap text-dark-green-s">
              <BsCheckCircle fontSize={"18"} width="18" />
            </th>
            <td className="px-6 py-4">
              <Link
                href={`/problems/${doc.id}`}
                className="hover:text-blue-600 cursor-pointer"
              >
                {doc.title}
              </Link>
            </td>
            <td className={`px-6 py-4 ${diffColor}`}>{doc.difficulty}</td>
            <td className={`px-6 py-4 `}>{doc.category}</td>
            <td className={`px-6 py-4 `}>
              {doc.videoId ? (
                <AiFillYoutube
                  fontSize={28}
                  className="cursor-pointer hover:text-red-600"
                />
              ) : (
                <p className="text-gray-400">Coming soon</p>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableProblems;

function useGetProblems(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [probs, setProbs] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      setLoading(true);

      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );

      const temp: DBProblem[] = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      setProbs(temp);
      setLoading(false);
    };
    getProblems();
  }, [setLoading]);

  return probs;
}
