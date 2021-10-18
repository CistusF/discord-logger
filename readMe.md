# Typescript Discord Bot
  
### 쉽게 디스코드 봇을 제작할 수 있도록 만든 레포입니다.
  

## 사용법
  
  
#### 1. 환경설정
  
##### 1-1 token
[디스코드_개발자_페이지](https://discord.com/developers/applications)에 접속후 우측 상단의 New Application을 눌러 애플리케이션을 생성합니다.  
생성후 좌측 리스트에 있는 Bot을 눌러 봇 페이지에 간 후 Add Bot을 눌러 봇을 활성화 해주세요.  
이후 Copy 버튼을 눌러 봇의 토큰을 복사 후 src폴더 안에 있는 Example.Config.ts 안에  
Discord_Bot_Token를 지우고 토큰을 붙여넣어주세요.  
  
##### 1-2 prefix  
명령어를 쓸때 가장 앞에 붙는 접두사 입니다.  
기본으로 ! 로 설정되어 있으며 가장 편한 접두사로 변경하면 됩니다.  
  
##### 1-3 owner  
자신의 유저아이디를 넣습니다.
유저아이디를 얻는법은 간단히  
디스코드 설정 > 고급 에서 개발자 모드를 활성화 합니다.  
이후 자신의 프로필을 우클릭 > ID 복사하기 를 하여 복사후  
Your_Discord_User_Id를 지우고 붙여넣어주세요.
  

#### 2. 봇 초대
  
##### 2-1 봇 유저아이디 얻기  
[디스코드_개발자_페이지](https://discord.com/developers/applications)에서 생성한 애플리케이션에 들어가면  
APPLICATION ID 부분을 복사합니다.
  
##### 2-2 봇 초대하기  
https://discord.com/api/oauth2/authorize?client_id=유저아이디&permissions=8 에서 유저아이디를 복사한 내용으로 변경후 접속합니다.  
이후 자신의 서버를 선택하여 봇을 초대합니다.
  

#### 3. 언어 다운로드  
  
##### 3-1 Node.js 다운
https://node.js.org/ 에서 Node.js를 다운하여 설치후  
재부팅 합니다.
    
##### 3-2 패키지 다운로드  
봇 폴더 안에있는 downloadPackage.bat를 실행합니다.  
  

#### 4. 봇 사용  
  
##### 4-1 컴파일  
src 폴더 안에서 코딩을 끝낸 뒤엔  
compile.bat를 사용하여 꼭 컴파일을 합니다.  
  
##### 4-2 실행  
start.bat를 사용하여 봇을 실행합니다.
  


##### 문의
  
[Vendetta_Discord](https://discord.gg/ZhUujTPPpq) 또는 Issue에 문의 부탁드립니다.