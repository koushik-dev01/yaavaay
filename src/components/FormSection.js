import ButtonPopup from "./ButtonPopup";
import FormOne from "./RegisterForm/FormOne";
import buyButtonImage from "./images/WITH-ALPHA-CHANNEL_GIhan_BTV_Creation_2nd-option__the-better-Y-BUTTON_Fiverr-Test_.gif";

import { useState, useEffect } from "react";

export default function FormSection({ textObject, backgroundImage }) {
	const [currentForm, setCurrentForm] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const openForm = (formNumber) => {
		setCurrentForm(formNumber);
	};

	const closeForm = () => {
		setCurrentForm(null);
	};

	useEffect(() => {
		// Define async function inside the effect
		const fetchTotalAmount = async () => {
			try {
				// Replace with the actual URL of your API
				const response = await fetch("https://api.yaavaay.com/donations");
				if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

				const data = await response.json();
				setTotalAmount(data.totalAmount);
			} catch (error) {
				console.error("Failed to fetch total amount:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		// Call the function
		fetchTotalAmount();
	}, []);

	useEffect(() => {
		const hash = window.location.hash;
		if (hash === '#liveamount') {
		  // Giving time for the page to load before scrolling
		  setTimeout(() => {
			const element = document.getElementById('liveamount');
			if (element) {
			  const headerOffset = 200; // Adjust this value based on your header height
			  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
			  const offsetPosition = elementPosition - headerOffset;
	
			  window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			  });
			}
		  }, 0);
		}
	  }, []);


	return (
		<section className="text-section"
			style={{
				background: `url(${backgroundImage})`,
				backgroundSize: "cover",
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<div id="chartContainer">
				<h1>{textObject.title}</h1>
				<div id="chartWrapper">
					<div id="cta-grid">
						<div className="grid-row">
							<div className="cta-cell" onClick={() => openForm(1)}>
								<span>Vice 01 - $100</span>
								<img src={buyButtonImage} width="15px" alt="pulsing buy button" />
							</div>
							<div className="info-cell">
								<ul>
									{textObject.vice01.map((element, index) => <li key={index}>{element}</li>)}
								</ul>
							</div>
						</div>
						<div className="grid-row">
							<div className="cta-cell" onClick={() => openForm(2)}>
								<span>Vice 02 - $1,000</span>
								<img src={buyButtonImage} width="15px" alt="pulsing buy button" />
							</div>
							<div className="info-cell">
								<ul>
									<li>{textObject.vice02}</li>
								</ul>
							</div>
						</div>
						<div className="grid-row">
							<div className="cta-cell" onClick={() => openForm(3)}>
								<span>Vice 03 - $10,000</span>
								<img src={buyButtonImage} width="15px" alt="pulsing buy button" />
							</div>
							<div className="info-cell">
								<ul>
									<li>{textObject.vice03}</li>
								</ul>
							</div>
						</div>
						<div className="grid-row">
							<div className="cta-cell" onClick={() => openForm(4)}>
								<span>Vice 04 - $100,000</span>
								<img src={buyButtonImage} width="15px" alt="pulsing buy button" />
							</div>
							<div className="info-cell">
								<ul>
									<li>{textObject.vice04}</li>
								</ul>
							</div>
						</div>
						<div className="grid-row">
							<div className="cta-cell" onClick={() => openForm(5)}>
								<span>Vice 05 - $900,000</span>
								<img src={buyButtonImage} width="15px" alt="pulsing buy button" />
							</div>
							<div className="info-cell">
								<ul>
									<li>{textObject.vice05}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<ButtonPopup
					isOpen={currentForm !== null}
					onClose={closeForm}
					step={currentStep}
				>
					{currentForm === 1 && (
						<FormOne
							productId="price_1Nx2hiCZjdGT7ryJjrJ1g5Ye"
							onNextStep={(step) => setCurrentStep(step)}
							amount={100}
						/>
					)}
					{currentForm === 2 && (
						<FormOne
							productId="price_1Nx71dCZjdGT7ryJlB1sccvL"
							onNextStep={(step) => setCurrentStep(step)}
							amount={1000}
						/>
					)}
					{currentForm === 3 && (
						<FormOne
							productId="price_1Nx71ZCZjdGT7ryJnkf0RjJI"
							onNextStep={(step) => setCurrentStep(step)}
							amount={1000000}
						/>
					)}
					{currentForm === 4 && (
						<FormOne
							productId="price_1Nx71WCZjdGT7ryJyHFaDepj"
							onNextStep={(step) => setCurrentStep(step)}
							amount={10000000}
						/>
					)}
					{currentForm === 5 && (
						<FormOne
							productId="price_1Nx71OCZjdGT7ryJrsUI8kgY"
							onNextStep={(step) => setCurrentStep(step)}
							amount={90000000}
						/>
					)}
				</ButtonPopup>
			</div>
			<div id="liveamount" className="live-budget">
				<h2>LIVE AMOUNT</h2>
				<h2>$11.564</h2>
			</div>
			<p className="footer f6">{textObject.footer}</p>
		</section>
	)
}
