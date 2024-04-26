// // PaginationControls.tsx
// 'use client';

// import { FC } from 'react';

// import { useRouter, useSearchParams } from 'next/navigation';

// interface PaginationControlsProps {
//   hasNextPage: boolean;
//   hasPrevPage: boolean;
// }

// const PaginationControls: FC<PaginationControlsProps> = ({
//   hasNextPage,
//   hasPrevPage,
// }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const page = searchParams.get('page') ?? '1';
//   const per_page = searchParams.get('per_page') ?? '5';

//   return (
//     <div className="flex gap-2">
//       <button
//         className="bg-blue-500 text-white p-1"
//         disabled={!hasPrevPage}
//         onClick={() => {
//           router.push(
//             `/messsages/?page=${Number(page) - 1}&per_page=${per_page}`,
//           );
//         }}
//       >
//         prev page
//       </button>

//       <div>
//         {page} / {Math.ceil(10 / Number(per_page))}
//       </div>

//       <button
//         className="bg-blue-500 text-white p-1"
//         disabled={!hasNextPage}
//         onClick={() => {
//           router.push(
//             `/messsages/?page=${Number(page) + 1}&per_page=${per_page}`,
//           );
//         }}
//       >
//         next page
//       </button>
//     </div>
//   );
// };

// export default PaginationControls;

"use client";

// PaginationControls.tsx
import React from "react";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { ArrowBigLeftDash, ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  persistent?: boolean;
  max?: number;
  onPageChange:
    | ((newPage: number) => void)
    | ((newPage: React.SetStateAction<number>) => void);
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  onPageChange,
  max,
  persistent,
}) => {
  const router = useRouter();

  return (
    <div className="flex w-full">
      <Button
        style={{ marginRight: "0.25em" }}
        color="primary"
        isDisabled={currentPage == 1}
        isIconOnly
        onPress={() => {
          if (persistent) router.push("?page=1");
          onPageChange(1);
        }}
      >
        <ArrowBigLeftDash size="sm" color="white" />
      </Button>
      <Button
        color="primary"
        isDisabled={currentPage == 1}
        isIconOnly
        onPress={() => {
          if (persistent) router.push(`?page=${currentPage - 1}`);
          onPageChange(currentPage - 1);
        }}
      >
        <ArrowLeft color="white" size="sm" />
      </Button>
      <div style={{ width: "100%" }} />
      <Button
        isIconOnly
        color="primary"
        isDisabled={max ? currentPage >= Math.ceil(max) : false}
        style={{ justifySelf: "flex-end" }}
        onPress={() => {
          if (persistent) router.push(`?page=${currentPage + 1}`);
          onPageChange(currentPage + 1);
        }}
      >
        <ArrowRight size="sm" color="white" />
      </Button>
    </div>
  );
};

export default PaginationControls;
