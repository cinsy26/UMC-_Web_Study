import React from "react";
import styled from "styled-components"; 
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // BrowserRouter를 추가해줍니다.
import { Link } from "react-router-dom";


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
        formState: { errors },
      } = useForm({mode: 'onChange'});
    
    const passwordValue = watch('password');// 'password' 필드의 값을 감시합니다

    const onSubmit = (data) => { //이부분 좀 더 찾아보기
        if (Object.keys(errors).length === 0) {
            // 모든 유효성 검사가 통과한 경우에만 홈페이지로 이동하고 알림을 띄웁니다.
            console.log("Form Submitted Successfully!", data); // 유효성 검사가 통과한 경우에만 로그를 출력합니다.
            alert("회원가입이 성공적으로 완료되었습니다!");
            navigate('/'); // 홈페이지로 이동합니다.
        } else {
            console.log("Form has errors. Please correct them before submitting."); // 유효성 검사에서 오류가 발생한 경우에만 에러 로그를 출력합니다.
        }
    };
    
    return (
        <SignupPageBack>
            <form onSubmit={handleSubmit(onSubmit)}>

                <SignupPage>회원가입 페이지</SignupPage>

                <InputPart
                    type="text"
                    placeholder="이름을 입력해주세요"
                    {...register('name', {required:true})}/>
                <SignupValidate>{errors.name && <p>이름을 입력해주세요</p>}</SignupValidate>

                <InputPart
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    {...register('id', {required:true})}/>
                <SignupValidate>{errors.id && <p>아이디를 입력해주세요</p>}</SignupValidate>

                <InputPart
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    {...register('email', {
                        required:true, 
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    
                    })}/>
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

                
                <SignupButton onClick={handleSubmit(onSubmit)}>제출하기</SignupButton>

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