import React, { useEffect } from "react";
import styled from "styled-components"; 
import { useForm, useWatch } from 'react-hook-form';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // BrowserRouter를 추가해줍니다.
import { Link } from "react-router-dom";
import axios from 'axios'; // axios를 import합니다.

const SignupPageBack = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(3, 37, 65, 1);
    color: white;
`

const SignupPage = styled.h2`
    padding: 20px;
    text-align: center;
`

const InputPart = styled.input`
    width: 400px;
    border-radius: 20px; /* 모서리를 둥글게 만듭니다 */
    padding: 10px; /* 입력 필드의 내부 여백을 설정합니다 */
    border: 1px solid #ccc; /* 입력 필드의 테두리 색상과 두께를 설정합니다 */
    font-size: 1rem; /* 입력 필드의 글꼴 크기를 설정합니다 */
`

const SignupValidate = styled.div`
    width: 400px;
    height: 40px;
    color: red;
    margin-left: 10px;
`
const SignupButton = styled.button`
    width: 430px;
    height: 50px;
    border-radius: 30px; /* 모서리를 둥글게 만듭니다 */
    margin-bottom: 30px;
    background-color: ${props => props.disabled ? '#ccc' : '#007bff'}; /* 버튼 색상 */
    color: ${props => props.disabled ? '#666' : 'white'}; /* 텍스트 색상 */
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; /* 커서 모양 */
`

const Other = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const OtherLeft = styled.div`
    margin-right: 15px;
    
`

const OtherRight = styled.div`
    cursor: pointer;
    margin-left: 15px
`

const StyledLink = styled(Link)`
    text-decoration: none; /* 링크 밑줄 제거 */
    font-weight: bold;
    margin-top: 20px;
    color: white;
`

function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange' });

    const password = watch('password');
    const passwordConfirm = watch('passwordConfirm');

    useEffect(() => {
        if (password !== passwordConfirm) {
            setError('passwordConfirm', {
                type: 'manual',
                message: '비밀번호가 일치하지 않습니다.',
            });
        }
    }, [password, passwordConfirm, setError]);

    const onSubmit = async (data) => {
        try {
            if (!isValid) {
                console.log("데이터가 유효하지 않습니다.");
                return; // 데이터가 유효하지 않으면 함수 종료
            }
            console.log("전송된 데이터:", data); // 전송된 데이터를 콘솔에 출력합니다.

            const response = await axios({
                url: `http://localhost:8080/auth/signup`, 
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                data: {
                    name: data.name,
                    username: data.id,
                    email: data.email,
                    age: data.age,
                    password: data.password,
                    passwordCheck: data.passwordConfirm,
                }
            });
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
    
            alert("회원가입이 성공적으로 완료되었습니다!");
            navigate('/loginpage');
        } catch (err) {
            console.error("Form submission error:", err); // 콘솔에 에러 출력

            if (err.response.status === 409 && err.response.data.message.includes("already exists")) {
                alert("아이디가 이미 존재합니다.");
            } else if (err.response.status === 400 && err.response.data.message === "Passwords do not match") {
                setError('passwordConfirm', {
                    type: 'manual',
                    message: '비밀번호가 일치하지 않습니다.',
                });
            } else {
                console.error("Form submission error:", err);
                alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            }
        }
    };
    
    return (
        <SignupPageBack>
            <form onSubmit={handleSubmit(onSubmit)}>

                <SignupPage>회원가입 페이지</SignupPage>

                <InputPart
                    type="text"
                    placeholder="이름을 입력해주세요"
                    {...register('name', { required: true })} />
                <SignupValidate>{errors.name && <p>이름을 입력해주세요</p>}</SignupValidate>

                <InputPart
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    {...register('id', { required: true })} />
                <SignupValidate>{errors.id && <p>아이디를 입력해주세요</p>}</SignupValidate>

                <InputPart
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    })} />
                <SignupValidate>
                    {errors.email?.type === 'required' && (<p>이메일을 입력해주세요</p>)}
                    {errors.email?.type === 'pattern' && (<p>이메일 양식에 맞게 입력해주세요</p>)}
                </SignupValidate>

                <InputPart
                    type="number"
                    placeholder="나이를 입력해주세요"
                    {...register('age', {
                        required: true,
                        validate: {
                            positive: value => value >= 0 || '나이는 음수일 수 없습니다.',
                            integer: value => Number.isInteger(Number(value)) || '나이는 소수일 수 없습니다.',
                            minAge: value => value >= 19 || '나이는 19살 이상이어야 합니다.',
                        },
                    })}
                />
                <SignupValidate>
                    {errors.age?.type === 'required' && (<p>나이를 입력해주세요</p>)}
                    {errors.age?.message && (<p>{errors.age.message}</p>)}
                </SignupValidate>

                <InputPart
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    {...register('password', {
                        required: true,
                        minLength: {
                            value: 4,
                            message: '비밀번호는 최소 4자리 이상이어야 합니다.',
                        },
                        maxLength: {
                            value: 12,
                            message: '비밀번호는 최대 12자리까지 가능합니다.',
                        },
                        validate: {
                            combination: value => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/.test(value) || '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다.',
                        },
                    })}
                />

                <SignupValidate>
                    {errors.password?.type === 'required' && (<p>비밀번호를 입력해주세요</p>)}
                    {errors.password?.message && (<p>{errors.password.message}</p>)}
                </SignupValidate>

                <InputPart
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register('passwordConfirm', {
                        required: true,
                        validate: {
                            matchPassword: value => value === watch('password') || '비밀번호가 일치하지 않습니다.',
                        },
                    })}
                />
                <SignupValidate>
                    {errors.passwordConfirm?.type === 'required' && (<p>비밀번호를 입력해주세요</p>)}
                    {errors.passwordConfirm?.message && (<p>{errors.passwordConfirm.message}</p>)}
                </SignupValidate>

                <SignupButton type="submit" disabled={!isValid || password !== passwordConfirm}>제출하기</SignupButton>

                <Other>
                    <OtherLeft>
                        <StyledLink to="/loginpage">이미 아이디가 있으신가요?</StyledLink>
                    </OtherLeft>
                    <OtherRight>로그인 페이지로 이동하기</OtherRight>
                </Other>
            </form>
        </SignupPageBack>
    );
}

export default SignUp;
