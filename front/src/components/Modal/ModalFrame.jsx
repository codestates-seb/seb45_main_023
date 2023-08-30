import React from "react";
import { useRecoilState } from "recoil";
import { isModalOpenState } from "../../recoil/example";
import { CloseButton } from "../Buttons";

const Modal = () => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="relative">
			<button
				onClick={openModal}
				className="bg-blue-500 text-white p-2 rounded-md"
			>
				Open Modal
			</button>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded-md shadow-md">
						<div className="flex justify-end">
							<CloseButton onClick={closeModal} />
						</div>
						<div className="mt-4">
							{/* 모달 내용 */}
							<h2 className="text-xl font-semibold">Modal Content</h2>
							<p>This is the content of the modal.</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Modal;
