import React from 'react'
import { Dropdown, Menu } from 'antd'

const CategoryList = (props) => {
  const selectCategory = (e) => {
    props.onChangeCategory(e.currentTarget.textContent)
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={selectCategory}>전체보기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>콘솔/휴대용게임기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>베이비패션</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아키즈패션</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아키즈패션</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물티슈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>분유/어린이식품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유용품/유아식기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유모차/웨건</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>카시트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아기띠/외출용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동침구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>놀이매트/안전용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아가구/인테리어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>욕실용품/스킨케어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>위생/건강/세제</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>완구/교구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동도서</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아/어린이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>소설/에세이/시</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>초중고참고서</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>캐릭터별완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아/영아완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>로봇/작동완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>역할놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>블록놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>인형</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물놀이/계절완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>승용완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스포츠/야외완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>실내대형완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>STEAM완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>학습완구/교구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>보드게임</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>RC완구/부품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>퍼즐/큐브/피젯토이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>프라모델</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>피규어/다이캐스트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유기농/친환경 전문관</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀·물티슈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>분유·유아식품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유·이유용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>위생·건강·세제</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아목욕·스킨케어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>외출용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>안전·실내용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동침구·가구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>완구·교구·도서</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동잡화</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>국내기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수입기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기능성기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>국내분유</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수입분유</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물티슈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>비데물티슈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기능성 물티슈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>로봇</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>액션피규어/조립완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>무선조종완구/RC</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>블록</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>캐릭터카드/딱지</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>퍼즐</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>보드게임</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>인형</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>역할놀이/소꿉놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>승용완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스포츠완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>공간놀이기구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물놀이용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>음악/악기놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>미술놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>자연과학완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>초등학습교구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>학습완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아/영유아완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>감각발달완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산DIY</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산선물/기념품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산준비패키지</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀케익</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>답례품</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>돌잔치용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>성장앨범/액자</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>손발도장/배냇액자</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>탯줄도장</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>탯줄보관함</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>베이비스튜디오</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>빨대컵</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>보온보냉컵</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아동용물병</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아동용컵</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아동용식기/식판</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식조리기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스푼</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>젓가락</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>포크</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>턱받이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>과즙망</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>보관용기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스낵컵/케이스</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>젖병</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>젖꼭지</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>일회용젖병/비닐팩</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>치발기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>노리개젖꼭지</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유축기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>모유저장팩</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>보틀워머</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>분유케이스</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유가리개</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유쿠션</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유패드</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유두교정기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>젖병세정용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>모유수유차/스틸티</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기타 수유용품</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>중고/리퍼</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동식</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동 두유</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동 치즈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동 과자</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동 주스/퓨레</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동 건강</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아목욕용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아스킨/바디용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아세제</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아구강용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>위생/건강용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>놀이방매트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>락커</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>바운서</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>흔들의자</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>보행기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>쏘서</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>점퍼루</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아안전용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>중고/리퍼</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유모차</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유모차용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>카시트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>카시트용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아기띠</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아기띠워머</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>바람막이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>슬링</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>파우치</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>포대기</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>힙시트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀가방</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아배낭</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>미아방지용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>중고/리퍼</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아침대</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아의자</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아책상</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아공부상</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아소파</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아책장</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아책꽂이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아옷장</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아옷걸이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀정리함</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아기의자/범보의자</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>취침등/자장가램프</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>범퍼/가드</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>블라인드</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>캐노피</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아침구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기타 가구/소품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>우주복</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>바디슈트/롬퍼</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>레그/스패츠</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>배냇저고리</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>손발싸개</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아모자/보닛</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>세트상품</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>여아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아속옷/언더웨어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아속옷/언더웨어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>배변훈련팬티</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산/백일/돌복</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>한복</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>주니어 여아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>주니어 남아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아동 스포츠의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아속옷/언더웨어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아속옷/언더웨어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>한복</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>우의</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>테마의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아신발</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아신발</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>보행기신발</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>가방</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>손가방</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>모자</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>선글라스/안경테</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>양말</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>우산</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>레깅스</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>덧신</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>토시</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>앞치마</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>마스크</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>머리핀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>멜빵</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>벨트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스카프</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>목도리/넥워머</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>장갑</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>시계</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>지갑</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>헤어밴드</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기타 패션소품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>분유</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물티슈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아기간식</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유모차</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>카시트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아세제</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>구강청결용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>소독/살균용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스킨/바디용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>위출용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>목욕용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>안전용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아침구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아가구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임산부용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임부복</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산/돌기념품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동 주얼리</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동언더웨어/잠옷</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수영복/용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아발육용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>교재/서적</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>인형</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>위생/건강용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유라동잡화</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>완구/매트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>공간/대형</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아용 자전거/킥보드</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>인형</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>교육</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>블록</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>분유</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>영유아식</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물티슈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>생리대</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유모차</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>카시트용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>외출용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아발육용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>소독/살균용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스킨/바디용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아가구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>목욕용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>구강청결용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아세제</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>안전용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>위생/건강용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임산부용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아침구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산/돌기념품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>브랜드</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아용품 렌탈</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임부복/임부 속옷</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>신생아 의류(12개월이하)</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아/토들러(12-48개월)</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>내의/잠옷/속옷</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아 의류(5-13세)</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아 의류(5-13세)</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동 공용 의류(5-13세)</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>주니어 여아의류(13-18세)</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>주니어 남아의류(13-18세)</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>우산우의장화/테마/발레</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아/아동 신발</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>모자/양말/시계/잡화</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>책가방/아동 가방</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아동수영복/물놀이용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아동한복/장신구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>0~3세</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>4~7세</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아교양</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>만화/캐릭터</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>베스트 세트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>정가제 FREE</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>추천상품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>초등1~2학년</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>초등3~4학년</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>초등5~6학년</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>초등전학년</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>어린이만화</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>교과서수록도서</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>단행본 세트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>아동문학론</div>
      </Menu.Item>

      <Menu.Item>
        <div onClick={selectCategory}>한국사</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>세계사</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>코딩/4차산업혁명</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>추천상품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유모차/카시트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아외출용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>놀이방매트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아발육용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아안전용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아가구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>소독/세정용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아스킨/바디케어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아구강용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아위생용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아목욕용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아세탁용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임부복</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임산부용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산/돌기념품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>분유</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식/유아간식</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아/영유아완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>감각발달완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>블록</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>승용완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>공간놀이완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스포츠완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>로봇/캐릭터완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>작동완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>역할놀이완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>인형</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>미술/공작놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>음악/악기놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>자연/과학완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>언어/학습완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>원목교구/가베</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동퍼즐</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물놀이완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>RC완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동공용의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동내의/잠옷</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동테마의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동스포츠의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동신발</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동가방</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동잡화</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>분유</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>수유용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식/유아간식</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>이유식용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>기저귀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아외출용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>소독/세정용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아위생용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아스킨/바디케어</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아구강용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아목욕용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아세탁용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아발육용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유모차/카시트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>놀이방매트</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아안전용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아가구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임부복</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>임산부용품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>출산/돌기념품</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아/영유아완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>감각발달완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>블록</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>미술/공작놀</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>언어/학습완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>역할놀이완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>음악/악기놀이</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>자연/과학완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동퍼즐</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>원목교구/가베</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>인형</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>승용완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>스포츠완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>공간놀이완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>물놀이완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>RC완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>로봇/캐릭터완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>작동완구</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>여아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>남아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동공용의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>신생아의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동내의/잠옷</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동스포츠의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동테마의류</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동신발</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동잡화</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={selectCategory}>유아동가방</div>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <span className="ant-dropdown-link">{props.category}</span>
    </Dropdown>
  )
}

export default CategoryList
