import { useLocation, useNavigate } from "react-router-dom";
import "./checkout.scss";
import { useEffect, useRef, useState } from "react";
import GetData from "../../../../hook/getData/getData";
import axios from "axios";
import Form from "./form/form";
import { useForm } from "react-hook-form";
import {
  SetData,
  SetDataWithQueryClient,
} from "../../../../hook/setData/setData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Card_form = (props) => {
  var setCard = props.setCard;
  var card = props.card;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const userId = localStorage.getItem("id");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");

  const SetCard = async (info) => {
    return await axios.post("http://clothes/users/setCard.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const { mutate, data, isSuccess } = SetDataWithQueryClient(
    SetCard,
    "setCardData",
    "getCard"
  );

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    setDate(value);
  };
  const validateDate = (value) => {
    const [month, day] = value.split("/").map(Number);
    if (!month || month < 1 || month > 12) {
      return "Month must be between 01 and 12";
    }
    if (!day || day < 1 || day > 31) {
      return "Day must be between 01 and 31";
    }

    if (month === 2 && day > 29) {
      return "February cannot have more than 29 days";
    }

    if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 30
    ) {
      return "This month cannot have more than 30 days";
    }

    return true;
  };

  const Handle = (data) => {
    if (data) {
      mutate({
        userId: userId,
        info: data,
      });
    }
  };
  const GetCard = async (id) => {
    const { data } = await axios.get(
      `http://clothes/users/getCard.php?id=${id}`
    );
    return data;
  };
  const { data: cardData } = GetData(() => GetCard(userId), "getCard");
  useEffect(() => {
    console.log(cardData);
  }, [cardData]);
  return (
    <div className="Card_form">
      <div className="Card_icons">
        <div>
          <svg
            width="80"
            height="46"
            viewBox="0 0 80 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="46" rx="8" fill="white" />
            <path
              d="M38.8537 22.0879V26.9405H37.3035V14.9566H41.4148C41.9056 14.9464 42.3935 15.0329 42.8505 15.2109C43.3074 15.389 43.7243 15.6552 44.0771 15.9941C44.4335 16.3124 44.7171 16.7028 44.9089 17.139C45.1008 17.5753 45.1963 18.0472 45.1892 18.5232C45.1994 19.0017 45.1053 19.4767 44.9134 19.9157C44.7214 20.3548 44.4361 20.7474 44.0771 21.0666C43.3582 21.7475 42.4708 22.0875 41.4148 22.0869H38.8537V22.0879ZM38.8537 16.432V20.6153H41.4534C41.7384 20.6237 42.022 20.5729 42.2861 20.4663C42.5502 20.3596 42.789 20.1993 42.9872 19.9957C43.1843 19.8054 43.341 19.5777 43.448 19.3262C43.555 19.0747 43.6102 18.8044 43.6102 18.5313C43.6102 18.2583 43.555 17.988 43.448 17.7365C43.341 17.4849 43.1843 17.2573 42.9872 17.0669C42.7915 16.8591 42.5535 16.6949 42.2891 16.5852C42.0247 16.4756 41.7398 16.4231 41.4534 16.4311H38.8537V16.432Z"
              fill="#5F6368"
            />
            <path
              d="M48.7613 18.4735C49.9071 18.4735 50.8116 18.7776 51.4746 19.3857C52.1377 19.9938 52.4689 20.8276 52.4683 21.8871V26.9405H50.9855V25.8027H50.9181C50.2762 26.7397 49.4225 27.2083 48.3569 27.2083C47.4474 27.2083 46.6864 26.9405 46.074 26.4051C45.7801 26.1593 45.5452 25.8515 45.3863 25.5042C45.2274 25.1568 45.1485 24.7786 45.1555 24.3971C45.1555 23.5486 45.4783 22.8739 46.1241 22.3728C46.7698 21.8718 47.6319 21.6206 48.7103 21.6194C49.6308 21.6194 50.3889 21.7867 50.9845 22.1214V21.7695C50.9863 21.5094 50.9298 21.2522 50.819 21.0166C50.7083 20.7809 50.5461 20.5726 50.3443 20.4069C49.9343 20.0396 49.4001 19.8392 48.848 19.8456C47.9821 19.8456 47.2968 20.2084 46.7923 20.9338L45.427 20.0799C46.178 19.009 47.2894 18.4735 48.7613 18.4735ZM46.7557 24.4306C46.7547 24.6265 46.8008 24.8198 46.8902 24.9945C46.9797 25.1691 47.1098 25.32 47.2699 25.4345C47.6127 25.7024 48.0383 25.8443 48.4744 25.8361C49.1286 25.8351 49.7556 25.5765 50.2181 25.1171C50.7316 24.6371 50.9884 24.0739 50.9884 23.4275C50.505 23.045 49.8311 22.8538 48.9664 22.8538C48.3367 22.8538 47.8116 23.0046 47.3912 23.3061C46.9666 23.6121 46.7557 23.984 46.7557 24.4306Z"
              fill="#5F6368"
            />
            <path
              d="M60.98 18.7412L55.8037 30.5549H54.2035L56.1244 26.4213L52.7207 18.7412H54.4057L56.8658 24.6313H56.8995L59.2922 18.7412H60.98Z"
              fill="#5F6368"
            />
            <path
              d="M32.5893 21.0418C32.5899 20.5727 32.5499 20.1043 32.4699 19.642H25.9321V22.2935H29.6766C29.6 22.717 29.4378 23.1206 29.1999 23.4802C28.9619 23.8398 28.6531 24.1478 28.2921 24.3856V26.1067H30.5268C31.8354 24.9086 32.5893 23.1368 32.5893 21.0418Z"
              fill="#4285F4"
            />
            <path
              d="M25.9323 27.7696C27.8031 27.7696 29.3783 27.1595 30.527 26.1077L28.2922 24.3866C27.6702 24.8054 26.8691 25.0444 25.9323 25.0444C24.1241 25.0444 22.5893 23.8339 22.0405 22.2026H19.7383V23.9764C20.3153 25.1166 21.2001 26.0751 22.2938 26.7449C23.3876 27.4148 24.6473 27.7695 25.9323 27.7696Z"
              fill="#34A853"
            />
            <path
              d="M22.0404 22.2027C21.7502 21.3479 21.7502 20.4222 22.0404 19.5674V17.7937H19.7382C19.2528 18.7529 19 19.8115 19 20.8851C19 21.9586 19.2528 23.0172 19.7382 23.9764L22.0404 22.2027Z"
              fill="#FBBC04"
            />
            <path
              d="M25.9323 16.7256C26.9209 16.7095 27.8762 17.0805 28.5917 17.7583L30.5703 15.7933C29.3157 14.623 27.6535 13.9805 25.9323 14.0005C24.6473 14.0005 23.3876 14.3552 22.2938 15.0251C21.2001 15.6949 20.3153 16.6534 19.7383 17.7936L22.0405 19.5674C22.5893 17.9361 24.1241 16.7256 25.9323 16.7256Z"
              fill="#EA4335"
            />
          </svg>
        </div>
        <div>
          <svg
            width="80"
            height="46"
            viewBox="0 0 80 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="46" rx="8" fill="white" />
            <path
              d="M57.7204 17.1774H55.1781C54.4095 17.1774 53.8183 17.4139 53.4636 18.1825L48.6155 29.2385H52.0446C52.0446 29.2385 52.6358 27.7604 52.7541 27.4057C53.1088 27.4057 56.4788 27.4057 56.9518 27.4057C57.0701 27.8195 57.3657 29.1794 57.3657 29.1794H60.4401L57.7204 17.1774ZM53.7001 24.9225C53.9957 24.213 55.0008 21.5525 55.0008 21.5525C55.0008 21.6116 55.2964 20.843 55.4146 20.4291L55.6511 21.4934C55.6511 21.4934 56.3015 24.3904 56.4197 24.9816H53.7001V24.9225Z"
              fill="#3362AB"
            />
            <path
              d="M48.852 25.2772C48.852 27.7604 46.6053 29.4158 43.117 29.4158C41.639 29.4158 40.22 29.1202 39.4514 28.7655L39.9244 26.0458L40.3383 26.2232C41.4025 26.6962 42.112 26.8736 43.4127 26.8736C44.3586 26.8736 45.3637 26.5188 45.3637 25.6911C45.3637 25.159 44.9499 24.8042 43.6492 24.213C42.4076 23.6218 40.7521 22.6758 40.7521 20.9612C40.7521 18.5963 43.0579 17 46.3097 17C47.5513 17 48.6155 17.2365 49.2658 17.5321L48.7929 20.1335L48.5564 19.897C47.9651 19.6605 47.1965 19.424 46.0732 19.424C44.8316 19.4832 44.2404 20.0153 44.2404 20.4883C44.2404 21.0204 44.9499 21.4342 46.0732 21.9663C47.9651 22.8532 48.852 23.8583 48.852 25.2772Z"
              fill="#3362AB"
            />
            <path
              d="M20 17.2956L20.0591 17.0591H25.1437C25.8532 17.0591 26.3853 17.2956 26.5627 18.0642L27.686 23.3853C26.5627 20.5473 23.9612 18.2415 20 17.2956Z"
              fill="#F9B50B"
            />
            <path
              d="M34.8401 17.1774L29.6964 29.1794H26.2081L23.252 19.1285C25.3804 20.4883 27.1541 22.6167 27.8044 24.0948L28.1592 25.3364L31.3518 17.1183H34.8401V17.1774Z"
              fill="#3362AB"
            />
            <path
              d="M36.1997 17.1183H39.4514L37.3821 29.1794H34.1304L36.1997 17.1183Z"
              fill="#3362AB"
            />
          </svg>
        </div>
        <div>
          <svg
            width="80"
            height="46"
            viewBox="0 0 80 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="46" rx="8" fill="white" />
            <path
              d="M33.7008 21.7031C33.56 22.7593 32.7151 22.7593 31.9406 22.7593H31.5181L31.8701 20.7174C31.8701 20.5766 32.011 20.5062 32.1518 20.5062H32.363C32.9263 20.5062 33.4192 20.5062 33.7008 20.7878C33.7008 21.0694 33.7008 21.3511 33.7008 21.7031ZM33.3488 18.8867H30.3211C30.1099 18.8867 29.9691 19.0275 29.8986 19.2388L28.7017 26.9839C28.7017 27.1248 28.7721 27.2656 28.9833 27.2656H30.3915C30.6028 27.2656 30.7436 27.1248 30.814 26.9135L31.166 24.8012C31.166 24.59 31.3773 24.4492 31.5885 24.4492H32.5742C34.5457 24.4492 35.6723 23.4634 36.0244 21.5623C36.1652 20.7174 36.0244 20.0837 35.6723 19.5908C35.109 19.1684 34.3345 18.8867 33.3488 18.8867Z"
              fill="#263577"
            />
            <path
              d="M40.319 24.5196C40.1782 25.3646 39.5445 25.9278 38.6996 25.9278C38.2771 25.9278 37.9251 25.787 37.7138 25.5054C37.5026 25.2237 37.4322 24.8717 37.5026 24.5196C37.6434 23.6747 38.2771 23.1114 39.1221 23.1114C39.5445 23.1114 39.8966 23.2522 40.1078 23.5339C40.2486 23.7451 40.3894 24.0972 40.319 24.5196ZM42.2905 21.7032H40.8823C40.7415 21.7032 40.6711 21.7736 40.6007 21.9144L40.5303 22.3369L40.4599 22.1961C40.1782 21.7736 39.4741 21.5624 38.77 21.5624C37.1506 21.5624 35.8128 22.7594 35.5311 24.4492C35.3903 25.2941 35.6015 26.0687 36.0944 26.6319C36.5168 27.1248 37.1506 27.3361 37.9251 27.3361C39.1925 27.3361 39.8966 26.4911 39.8966 26.4911L39.8262 26.9136C39.8262 27.0544 39.8966 27.1952 40.1078 27.1952H41.3752C41.5864 27.1952 41.7272 27.0544 41.7977 26.8432L42.5722 21.9144C42.5722 21.844 42.5018 21.7032 42.2905 21.7032Z"
              fill="#263577"
            />
            <path
              d="M49.9656 21.7032H48.4869C48.3461 21.7032 48.2053 21.7737 48.1349 21.9145L46.1634 24.8717L45.3184 22.0553C45.248 21.8441 45.1072 21.7737 44.896 21.7737H43.4878C43.3469 21.7737 43.2061 21.9145 43.2765 22.1257L44.896 26.7728L43.4173 28.8851C43.2765 29.026 43.4174 29.3076 43.6286 29.3076H45.1072C45.248 29.3076 45.3889 29.2372 45.4593 29.0964L50.2472 22.1257C50.3176 21.9145 50.1768 21.7032 49.9656 21.7032Z"
              fill="#263577"
            />
            <path
              d="M55.1054 21.7031C54.9645 22.7593 54.1196 22.7593 53.3451 22.7593H52.9226L53.2747 20.7174C53.2747 20.5766 53.4155 20.5062 53.5563 20.5062H53.7676C54.3308 20.5062 54.8237 20.5062 55.1054 20.7878C55.1758 21.0694 55.1758 21.3511 55.1054 21.7031ZM54.7533 18.8867H51.7257C51.5144 18.8867 51.3736 19.0275 51.3032 19.2388L50.1062 26.9839C50.1062 27.1248 50.1766 27.2656 50.3879 27.2656H51.9369C52.0777 27.2656 52.2185 27.1952 52.2185 26.9839L52.5706 24.8012C52.5706 24.59 52.7818 24.4492 52.993 24.4492H53.9788C55.9503 24.4492 57.0769 23.4634 57.4289 21.5623C57.5697 20.7174 57.4289 20.0837 57.0769 19.5908C56.584 19.1684 55.8095 18.8867 54.7533 18.8867Z"
              fill="#2199D6"
            />
            <path
              d="M61.7946 24.5196C61.6538 25.3646 61.0201 25.9278 60.1752 25.9278C59.7527 25.9278 59.4007 25.787 59.1894 25.5054C58.9782 25.2237 58.9078 24.8717 58.9782 24.5196C59.119 23.6747 59.7527 23.1114 60.5976 23.1114C61.0201 23.1114 61.3722 23.2522 61.5834 23.5339C61.7242 23.7451 61.865 24.0972 61.7946 24.5196ZM63.7661 21.7032H62.3579C62.2171 21.7032 62.1467 21.7736 62.0762 21.9144L62.0059 22.3369L61.9354 22.1961C61.6538 21.7736 60.9497 21.5624 60.2456 21.5624C58.6261 21.5624 57.2883 22.7594 57.0067 24.4492C56.8659 25.2941 57.0771 26.0687 57.57 26.6319C57.9924 27.1248 58.6261 27.3361 59.4007 27.3361C60.668 27.3361 61.3721 26.4911 61.3721 26.4911L61.3017 26.9136C61.3017 27.0544 61.3722 27.1952 61.5834 27.1952H62.8508C63.062 27.1952 63.2028 27.0544 63.2732 26.8432L64.0478 21.9144C64.0478 21.844 63.9069 21.7032 63.7661 21.7032Z"
              fill="#2199D6"
            />
            <path
              d="M65.4559 19.098L64.1885 26.9839C64.1885 27.1248 64.2589 27.2656 64.4701 27.2656H65.7375C65.9488 27.2656 66.0896 27.1248 66.16 26.9135L67.357 19.1684C67.357 19.0275 67.2865 18.8867 67.0753 18.8867H65.6671C65.5967 18.8867 65.5263 19.0275 65.4559 19.098Z"
              fill="#2199D6"
            />
            <path
              d="M16.1681 28.7443L16.3794 27.2657H15.8865H13.4221L15.112 16.4929C15.112 16.4929 15.112 16.4225 15.1824 16.4225H15.2528H19.407C20.7448 16.4225 21.7306 16.7041 22.2235 17.2674C22.4347 17.5491 22.5755 17.8307 22.6459 18.1123C22.7163 18.4644 22.7163 18.8164 22.6459 19.3093V19.591L22.8572 19.7318C23.0684 19.8022 23.2092 19.943 23.35 20.0838C23.5613 20.2951 23.7021 20.5767 23.7021 20.9288C23.7725 21.2808 23.7725 21.7033 23.6317 22.1962C23.4908 22.7594 23.35 23.1819 23.1388 23.6044C22.9276 23.9564 22.6459 24.2381 22.3643 24.5197C22.0826 24.7309 21.6602 24.8718 21.3081 25.0126C20.8856 25.083 20.4632 25.1534 19.9703 25.1534H19.6183C19.407 25.1534 19.1958 25.2238 18.9846 25.3646C18.8437 25.5055 18.7029 25.7167 18.6325 25.9279V26.0687L18.21 28.6739V28.7443V28.8148C18.21 28.8148 18.21 28.8148 18.1396 28.8148H16.1681V28.7443Z"
              fill="#263577"
            />
            <path
              d="M23.139 19.3092C23.139 19.3796 23.139 19.45 23.0686 19.5204C22.5053 22.3369 20.6746 23.2522 18.2806 23.2522H17.0836C16.802 23.2522 16.5204 23.4634 16.5204 23.7451L15.8867 27.6881L15.7458 28.8146C15.7458 29.0259 15.8867 29.1667 16.0275 29.1667H18.2102C18.4919 29.1667 18.7031 28.9555 18.7031 28.7442V28.6034L19.1256 26.0686V25.9278C19.196 25.6462 19.4072 25.5053 19.6184 25.5053H19.9705C22.0828 25.5053 23.7022 24.6604 24.1247 22.196C24.3359 21.1399 24.1951 20.295 23.7023 19.7317C23.5614 19.5908 23.3502 19.45 23.139 19.3092Z"
              fill="#2199D6"
            />
            <path
              d="M22.5756 19.098C22.5052 19.098 22.4348 19.0275 22.2939 19.0275C22.2235 19.0275 22.0827 18.9571 22.0123 18.9571C21.6602 18.8867 21.3082 18.8867 20.9561 18.8867H17.7172C17.6468 18.8867 17.5764 18.8867 17.506 18.9571C17.3652 19.0275 17.2244 19.1684 17.2244 19.3092L16.5203 23.6746V23.8155C16.5907 23.5338 16.8019 23.3226 17.0835 23.3226H18.2805C20.6745 23.3226 22.5052 22.3368 23.0684 19.5908C23.0684 19.5204 23.0684 19.45 23.1389 19.3796C22.998 19.3092 22.8572 19.2388 22.7164 19.1684C22.646 19.098 22.5756 19.098 22.5756 19.098Z"
              fill="#252C5E"
            />
            <path
              d="M17.2246 19.3093C17.2246 19.1685 17.3655 19.0277 17.5063 18.9572C17.5767 18.9572 17.6471 18.8868 17.7175 18.8868H20.9564C21.3084 18.8868 21.7309 18.8868 22.0126 18.9572C22.083 18.9572 22.2238 18.9572 22.2942 19.0277C22.3646 19.0277 22.435 19.0981 22.5758 19.0981C22.6463 19.0981 22.6463 19.0981 22.7167 19.1685C22.8575 19.2389 22.9983 19.3093 23.1391 19.3797C23.28 18.3236 23.1391 17.6194 22.5758 16.9857C21.9421 16.2816 20.8156 16 19.4074 16H15.2531C14.9715 16 14.6899 16.2112 14.6899 16.4929L13 27.3361C13 27.5473 13.1408 27.7586 13.3521 27.7586H15.8868L16.5205 23.6748L17.2246 19.3093Z"
              fill="#263577"
            />
          </svg>
        </div>
        <div>
          <svg
            width="80"
            height="46"
            viewBox="0 0 80 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="46" rx="8" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.0004 21.6599C15.8903 21.9352 15.8352 22.2289 15.7618 22.5225C15.5783 23.4034 15.4315 24.3394 15.2296 25.2203C14.8258 25.2203 14.4037 25.2203 14 25.2203C14.4588 22.2472 15.303 19.3476 15.67 16.1543C16.0738 16.1543 16.4775 16.1543 16.8629 16.1543C16.8079 16.4479 16.7345 16.7232 16.6978 17.0169C16.6978 17.0352 16.6611 17.0536 16.6611 17.0903C17.2116 16.3745 18.0558 15.879 19.3955 16.0258C20.7169 16.1543 21.4326 17.2004 21.4877 18.43C21.6161 20.779 20.3682 22.9079 17.7989 22.7244C16.9547 22.6693 16.3124 22.3573 16.0004 21.6599ZM17.7255 17.2004C16.6427 17.7509 15.5966 20.2835 16.8262 21.3663C17.6337 22.082 18.9 21.6966 19.4322 21.036C20.0378 20.2835 20.5884 18.118 19.6708 17.3472C19.3588 17.0903 18.8633 16.9985 18.4045 17.0536C18.0742 17.0719 17.909 17.1086 17.7255 17.2004Z"
              fill="#030000"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.1586 22.5958C26.7732 22.5958 26.3878 22.5958 25.984 22.5958C26.0391 22.2288 26.1125 21.8801 26.1859 21.5314C25.8372 22.0452 25.2316 22.6325 24.3507 22.7243C23.0844 22.8527 21.9282 22.2104 21.8181 21.1643C21.7814 20.8157 21.7998 20.2467 22.0934 19.8063C22.8275 18.6501 24.7361 18.5767 26.6264 18.6318C27.1953 16.5396 24.1488 16.8516 23.1028 17.5306C23.1578 17.1269 23.2496 16.7415 23.3046 16.3377C25.1949 15.7505 27.7458 15.8973 27.8927 17.9344C27.9477 18.7419 27.7091 19.531 27.5623 20.3018C27.4155 21.0542 27.2687 21.7883 27.1586 22.5958ZM23.1578 20.9258C23.1945 21.458 23.7818 21.7516 24.2589 21.7516C25.5619 21.77 26.1859 20.6321 26.3878 19.5127C24.9196 19.4392 23.0661 19.6228 23.1578 20.9258Z"
              fill="#030000"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.9848 16.1726C30.2601 17.8794 30.5904 19.531 30.8474 21.2745C31.82 19.6045 32.7193 17.861 33.6736 16.1726C34.1141 16.1726 34.5545 16.1726 35.0133 16.1726C33.8388 18.3015 32.4624 20.6322 31.141 22.8711C30.7373 23.5685 30.3335 24.5045 29.7463 24.9633C29.2324 25.367 28.2414 25.4588 27.4155 25.2936C27.4339 24.9266 27.5623 24.6513 27.5807 24.3026C27.7459 24.2843 27.9477 24.3944 28.1496 24.3944C29.0489 24.3944 29.5444 23.5685 29.8747 22.9262C29.4893 20.7056 29.0672 18.5033 28.6818 16.2644C28.6451 16.2277 28.6635 16.2093 28.6818 16.1726C29.1223 16.1726 29.5627 16.1726 29.9848 16.1726Z"
              fill="#030000"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35.5455 26.358C35.2703 27.918 34.9216 29.3861 34.6463 30.9461C33.7837 30.9461 32.9212 30.9461 32.0403 30.9461C32.444 29.0374 32.7927 27.1472 33.1781 25.2569C33.5635 23.385 34.0223 21.5131 34.2425 19.531C34.9399 19.476 35.8759 19.476 36.5733 19.531C36.5549 19.9715 36.4448 20.3385 36.4081 20.7606C37.0871 20.0816 37.8212 19.1823 39.3811 19.3292C40.8677 19.476 41.6935 20.7239 41.8036 22.3022C42.0055 25.0183 40.6841 27.6794 38.2984 27.8629C36.8118 27.973 36.1145 27.294 35.5455 26.358ZM36.5916 22.3022C35.986 23.1648 35.7841 24.8164 36.5549 25.4588C37.0321 25.8625 37.913 25.6606 38.3167 25.3303C38.8306 24.9082 39.1976 24.1007 39.1793 23.0913C39.1609 22.1737 38.7572 21.4029 37.7845 21.5314C37.2156 21.6048 36.8669 21.8985 36.5916 22.3022Z"
              fill="#009651"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.9425 27.6978C48.2635 27.6794 47.4927 27.7345 46.8687 27.6611C46.9421 27.294 46.9421 26.8352 46.9972 26.4682C46.7953 26.6701 46.6485 26.9637 46.3915 27.2023C45.5473 27.9731 43.6571 28.1382 42.7211 27.3674C41.7118 26.5232 41.8769 24.5045 42.7211 23.642C43.6938 22.6326 45.529 22.3757 47.4193 22.5775C47.6028 21.8067 47.0889 21.3296 46.4466 21.2378C45.5106 21.1094 44.2627 21.5131 43.7121 21.8434C43.8223 21.1828 43.859 20.467 43.9874 19.8064C44.6481 19.5678 45.2721 19.3843 46.0612 19.3476C48.2451 19.2007 49.75 19.9348 49.8968 21.8067C49.9702 22.7978 49.6766 23.8255 49.4564 24.7981C49.2545 25.7524 49.1077 26.7251 48.9425 27.6978ZM46.3181 24.0273C45.529 24.0457 44.6664 24.3026 44.4829 24.8899C44.3361 25.4038 44.7032 25.8809 45.0885 25.9543C46.2998 26.2112 47.1256 25.0184 47.2174 24.064C46.9421 24.009 46.5384 24.0273 46.3181 24.0273Z"
              fill="#009651"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M56.9441 19.8063C56.8156 20.467 56.577 21.0175 56.4486 21.6782C55.8062 21.458 55.0354 21.1276 54.0261 21.2377C53.6223 21.2928 53.2186 21.4947 53.2186 21.8984C53.2369 22.3939 53.9894 22.5775 54.4482 22.761C55.0905 23.0363 55.8613 23.4033 56.1733 23.9539C56.7055 24.9082 56.1733 26.3029 55.6044 26.8902C55.1272 27.3857 54.228 27.7895 53.3103 27.8629C52.1175 27.9546 50.8695 27.7344 49.8418 27.4591C49.9886 26.7801 50.1538 26.1561 50.3373 25.5321C51.0163 25.8074 51.7871 26.0644 52.8332 25.9726C53.3287 25.9175 53.8793 25.7524 53.8059 25.1651C53.7508 24.6879 53.0351 24.5228 52.5029 24.3026C51.5118 23.8988 50.7778 23.3849 50.7778 22.0452C50.7778 19.2924 54.595 18.8336 56.9441 19.8063Z"
              fill="#009651"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M63.4407 19.8063C63.2939 20.4486 63.092 21.0543 62.9085 21.6782C62.3029 21.4397 61.5137 21.1277 60.5044 21.2378C60.1006 21.2745 59.6969 21.4764 59.6969 21.8985C59.7152 22.4123 60.6328 22.6876 61.0549 22.8711C61.9175 23.2382 62.7433 23.6419 62.8534 24.6329C62.9635 25.6056 62.5598 26.3947 61.9909 26.9269C61.4587 27.4408 60.6695 27.7895 59.7886 27.8629C58.5774 27.9547 57.4028 27.7344 56.3201 27.4592C56.4302 26.7618 56.6504 26.1929 56.7789 25.5322C57.2744 25.679 57.7515 25.9176 58.3388 25.9726C59.1646 26.046 60.2841 25.991 60.2658 25.2752C60.2474 24.5045 58.6508 24.3393 58.0268 23.8438C57.3478 23.3116 56.9257 22.0086 57.4579 20.9441C58.3388 19.2925 61.3669 18.9254 63.4407 19.8063Z"
              fill="#009651"
            />
            <path
              d="M64.4133 20.6506H64.083L64.1014 20.5221H64.9089L64.8905 20.6506H64.5602L64.3766 21.6599H64.2298L64.4133 20.6506Z"
              fill="#009651"
            />
            <path
              d="M65.7713 21.6599L65.8447 21.0543C65.863 20.9442 65.8814 20.779 65.8998 20.6689C65.8447 20.779 65.7896 20.9258 65.7162 21.036L65.3859 21.6599H65.2758L65.184 21.0543C65.1657 20.9258 65.1473 20.7974 65.1473 20.6689C65.129 20.779 65.0923 20.9442 65.0556 21.0543L64.9087 21.6599H64.7803L65.0739 20.5221H65.2574L65.3492 21.1644C65.3675 21.2562 65.3675 21.3663 65.3675 21.4581C65.4042 21.3663 65.4593 21.2745 65.496 21.1828L65.8447 20.5221H66.0282L65.8814 21.6599H65.7713Z"
              fill="#009651"
            />
          </svg>
        </div>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit(Handle)}>
          <input
            {...register("cardNumber", {
              required: "Card number is required",
              validate: (value) =>
                value.replace(/\s/g, "").length === 16 ||
                "Card number must be 16 digits",
            })}
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />

          <input
            {...register("cardName", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name must contain only letters",
              },
            })}
            type="text"
            placeholder="Name of card"
          />

          <input
            {...register("cardDate", {
              required: "Expiration date is required",
              validate: validateDate,
            })}
            type="text"
            placeholder="Expiration date (MM/YY)"
            value={date}
            onChange={handleDateChange}
          />

          <input
            {...register("cardCode", {
              required: "Security code is required",
              pattern: {
                value: /^\d{3}$/,
                message: "Security code must be 3 digits",
              },
            })}
            type="text"
            placeholder="Security Code"
            maxLength={3}
          />

          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
      <div className="Cards_box">
        {cardData?.map((e) => (
          <div className={`Card_box ${card == e.id ? "Active" : ""}`}>
            <div
              className="Info"
              onClick={() => {
                setCard(e.id);
                console.log(card);
              }}
            >
              <div className="Card_number">Cart Number: {e.number}</div>
              <div className="Card_date">Date: {e.date}</div>
              <div className="Card_name">Name: {e.name}</div>
            </div>
            <button
              onClick={() => {
                if (card == e.id) {
                  setCard(null);
                }
                mutate({
                  status: "del",
                  id: e.id,
                });
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function Checkout() {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [delivery, setDelivery] = useState();
  const [diffAddress, setDiff] = useState("same");
  const [randomDate, setRandomDate] = useState("");
  const radio1 = useRef();
  const radio2 = useRef();
  const PayRadio1 = useRef();
  const PayRadio2 = useRef();
  const [pay, setPay] = useState("card");
  const [card, setCard] = useState("");
  const Id = localStorage.getItem("id");
  const CheckAddress = async (id) => {
    const { data } = await axios.get(
      `http://clothes/product/checkAddress.php?id=${id}`
    );
    return data;
  };

  const SetOrder = async (info) => {
    return await axios.post("http://clothes/product/setOrder.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const { data: orderData, mutate } = SetData(SetOrder, "setOrder");
  useEffect(() => {
    if (orderData?.data == "order") {
      Navigate("/orderPlaced", { replace: true });
    }
  }, [orderData]);
  const { data } = GetData(() => CheckAddress(Id), "checkAddress");

  const GetRandomDate = () => {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 30) + 1;
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + randomDays);

    const formattedDate = newDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    return formattedDate;
  };

  useEffect(() => {
    setRandomDate(GetRandomDate());
  }, []);

  const HandlePay = () => {
    console.log(pay,'pay');
    var date = new Date();

    const randomDays = Math.floor(Math.random() * 5) + 1;

    var DeliveryDate = new Date();
    DeliveryDate.setDate(DeliveryDate.getDate() + randomDays);
    if (pay == "card") {
      if (card !== "") {
        if (data?.shipping !== "false" && data?.billing !== "false") {
          for (
            let Product = 0;
            Product < Location.state?.products.length;
            Product++
          ) {
            mutate({
              payMethod: "card",
              cardId: card,
              productId: Location.state.products[Product].productId,
              userId: Location.state.products[Product].userId,
              total:
                Location.state?.coupon && parseInt(Location.state?.coupon) !== 0
                  ? parseInt(Location.state.products[Product].price / 10) -
                    (parseInt(Location.state.products[Product].price / 10) *
                      parseInt(Location.state.coupon)) /
                      100
                  : parseInt(Location.state.products[Product].price / 10),
              date: date.toLocaleString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false, // 24-часовой формат
              }),
              deliveryDate: DeliveryDate.toLocaleString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              }),
              quantity: Location.state.products[Product].quantity,
              color: Location.state.products[Product].color,
              size: Location.state.products[Product].size,
              status: "Placed",
            });
          }
        }
      }
    } else {
   
      
      for (
        let Product = 0;
        Product < Location.state?.products.length;
        Product++
      ) {
        mutate({
          payMethod: "delivery",
          productId: Location.state.products[Product].productId,
          userId: Location.state.products[Product].userId,
          total:
            Location.state?.coupon && parseInt(Location.state?.coupon) !== 0
              ? parseInt(Location.state.products[Product].price / 10) -
                (parseInt(Location.state.products[Product].price / 10) *
                  parseInt(Location.state.coupon)) /
                  100
              : parseInt(Location.state.products[Product].price / 10),
              date: date.toLocaleString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false, // 24-часовой формат
              }),
              deliveryDate: DeliveryDate.toLocaleString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              }),
          quantity: Location.state.products[Product].quantity,
          color: Location.state.products[Product].color,
          size: Location.state.products[Product].size,
          status: "Placed",
        });
      }
    }
  };
  return (
    <div className="Checkout_container">
      <div className="Set_info">
        <div className="Title_box">
          <div className="Title">
            <h1>Check Out</h1>
          </div>
        </div>
        <div className="Checkout_box">
          {data?.billing == "false" ? (
            <Form state={diffAddress} name={"billing"} />
          ) : (
            ""
          )}

          {data?.shipping == "false" ? (
            diffAddress == "diff" ? (
              <Form state={diffAddress} name={"shipping"} />
            ) : (
              <div className="Shipping_box">
                <div className="Title_box">
                  <div>
                    <h1>Shipping Address</h1>
                  </div>
                  <div>
                    <p>
                      Select the address that matches your card or payment
                      method.
                    </p>
                  </div>
                </div>

                <div className="Shipping_box">
                  <div className="Same_address">
                    <div>
                      <input
                        ref={radio1}
                        checked={diffAddress == "same" ? true : false}
                        type="radio"
                        onClick={() => {
                          radio2.current.checked = false;
                        }}
                      />
                    </div>
                    <div>
                      <h1>Same as Billing address</h1>
                    </div>
                  </div>
                  <div className="Diff_address">
                    <div>
                      <input
                        ref={radio2}
                        type="radio"
                        onClick={() => {
                          setDiff("diff");
                          radio1.current.checked = false;
                        }}
                      />
                    </div>
                    <div>
                      <h1>Use a different shipping address</h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            ""
          )}

          <div className="Shipping_method">
            <div className="Date_box">
              <h1>Arrives by {randomDate}</h1>
            </div>
            <div className="Delivery_price">
              <div className="Title_box">
                <div>
                  <h1>Delivery Charges</h1>
                </div>
                <div>
                  <p>Additional fees may apply</p>
                </div>
              </div>
              <div>
                <h1>
                  $
                  {Location.state?.products
                    .reduce((acc, curr) => {
                      return acc + (curr.shipping === "true" ? 5 : 0);
                    }, 0)
                    .toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="Pay_method">
          <div className="Title_box">
            <div>
              <h1>Payment Method</h1>
            </div>
            <div>
              <p>All transactions are secure and encrypted.</p>
            </div>
          </div>
          <div className="Paymant_box">
            <div className="Cart_box">
              <div>
                <input
                  ref={PayRadio1}
                  checked={pay == "card"}
                  onClick={() => {
                    PayRadio2.current.checked = false;
                    setPay("card");
                  }}
                  type="radio"
                />
              </div>
              <div className="Info_box">
                <div className="Title_box">
                  <div>
                    <h1>Credit Card</h1>
                  </div>
                  <div>
                    <p>We accept all major credit cards.</p>
                  </div>
                </div>
                {pay == "card" ? (
                  <Card_form card={card} setCard={setCard} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="On_delivery_box">
              <div>
                <input
                  onClick={() => {
                    PayRadio1.current.checked = false;
                    setPay("delivery");
                  }}
                  ref={PayRadio2}
                  type="radio"
                />
              </div>
              <div className="Info_box">
                <div>
                  <h1>Cash on delivery</h1>
                </div>
                <div>
                  <p>Pay with cash upon delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Pay_button" onClick={() => HandlePay()}>
          <button>Pay Now</button>
        </div>
      </div>

      <div className="Orders_list">
        <div className="Title_box">
          <h1>Order Summary</h1>
        </div>
        <div className="Orders">
          {Location.state?.products?.map((e) => (
            <div className="Order" key={e.id}>
              <div className="First_row">
                <div className="Img_box">
                  <img src={e.img} alt="" />
                </div>
                <div className="Info_box">
                  <div>
                    <h1>
                      {e.name} <span>x {e.quantity}</span>
                    </h1>
                  </div>
                  <div>
                    <h1>
                      Colour : <span>{e.color}</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="Price_box">
                ${((e.price / 10) * e.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="Total_price">
          <div className="Subtotal_box">
            <div className="Subtotal">
              <div>
                <h1>
                  Subtotal{" "}
                  <span>( {Location.state?.products.length} items )</span>
                </h1>
              </div>
              <div>
                <h1>
                  $
                  {Location.state?.products
                    .reduce(
                      (acc, curr) =>
                        acc + parseInt(curr.price / 10) * curr.quantity,
                      0
                    )
                    .toFixed(2)}
                </h1>
              </div>
            </div>
            {Location.state?.coupon !== 0 ? (
              <div className="Coupon">
                <div>
                  <h1>Savings</h1>
                </div>
                <div>
                  <h1>
                    -$
                    {(
                      Location.state?.products.reduce(
                        (acc, curr) =>
                          acc + parseFloat(curr.price / 10) * curr.quantity,
                        0
                      ) -
                      Location.state?.products.reduce(
                        (acc, curr) =>
                          acc + parseFloat(curr.price / 10) * curr.quantity,
                        0
                      ) *
                        (1 - Location.state.coupon / 100)
                    ).toFixed(2)}
                  </h1>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="Shipping_box">
            <div>
              <h1>Shipping</h1>
            </div>
            <div>
              <h1>
                $
                {Location.state?.products
                  .reduce((acc, curr) => {
                    return acc + (curr.shipping === "true" ? 5 : 0);
                  }, 0)
                  .toFixed(2)}
              </h1>
            </div>
          </div>
          <div className="Total_box">
            <div>
              <h1>Total</h1>
            </div>
            <div>
              <h1>
                $
                {(function () {
                  const total = Location.state?.products.reduce(
                    (acc, curr) =>
                      acc +
                        parseFloat(
                          (curr.price / 10) * curr.quantity +
                            (curr.shipping === "true" ? 5 : 0)
                        ) || 0,
                    0
                  );
                  return (
                    Location.state?.coupon !== 0
                      ? total - total * (Location.state?.coupon / 100)
                      : total
                  ).toFixed(2);
                })()}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
