"use client";

import { useState } from "react";
import { Todo } from "./Todo";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Masonry from "react-responsive-masonry";

function StickyNote() {
  const [todoList, setTodoList] = useState([
    {
      id: "z",
      title: "Tổng kết năm 2022",
      content:
        "Năm 2022 là năm thật sự rất vui và ý nghĩa với anh, đi cùng với đó cũng có một vài nỗi buồn, nhưng đó chắc hẳn đã là quy luật trong cuộc sống. Dù là nỗi buồn hay niềm vui thì anhvẫn rất trân trọng vì chính nó đã tạo nên con người anh và em bây giờ. Sang năm 2023, anh sẽ không ước là chuyện tình tụi mình chỉ là những niềm vui và vắng bóng nỗi buồn, mà anh ước là tụi mình sẽ đi với nhau đủ lâu để có thể nhận ra được giá trị thật sự của tình yêu là gì. Anh cũng chúc em một năm mới luôn tràn đầy niềm vui và năng lượng tích cực để có thể cảm nhận được cuộc đời mình đáng sống. Anh vẫn yêu em nhiều lắm",
    },
    {
      id: "x",
      title: "ÔNG QUÉO NÓI GÌ KHI NÓI VỀ CHẠY BỘ",
      content:
        "Anh là 1 người chạy bộ nghiệp dư, anh đã chạy được 6 năm và vẫn đang giữ được mức độ hứng thú và kỉ luật ổn định với bộ môn này… và anh không thần tượng chạy bộ, mặt khác anh thật sự nghĩ là mỗi môn thể thao đều có những điều rất hay. Vợ anh thích tập yoga, con trai anh thích trượt patin, cầu lông và bóng rổ, con gái anh thích đi bơi,… anh hiểu và thích thú tất cả những môn thể thao đó vì anh đã chơi qua rất nhiều môn… cầu lông, trượt patin, yoga, golf, bơi lội… tất cả đều rất vui. Chơi là vui rồi!",
    },
    {
      id: "c",
      title: "HÀNH TRÌNH CỦA TÌNH YÊU",
      content:
        "Vì người có tổn thương trong lòng sẽ có sự thiếu thốn, mong đợi sự chăm sóc, yêu thương rất nhiều từ đối phương => Họ sẽ làm người khác bị tổn thương nếu người khác không đáp ứng nhu cầu của họ, hoặc là họ sẽ rất dễ bị người khác bắt nạt, lấn át hoặc bị thao túng về cảm xúc và tâm lý",
    },
    {
      id: "v",
      title: "Bổ sung 7 habits",
      content:
        "Góc nhìn, Lăng kính, Bản đồ, Mô thức,... là cách chúng ta nhìn nhận sự việc Không phải theo nghĩa chức năng thị giác, mà liên quan đến nhận thức, sự thấu hiểu và diễn giải sự thấu hiểu đó. Nó là cội nguồn của thái độ và hành vi chúng ta",
    },
    {
      id: "b",
      title: "",
      content: "Giá cp --> LNST",
    },
    {
      id: "n",
      title: "web tự học code",
      content: "W3Schools",
    },
    {
      id: "m",
      title: "Chú Châu",
      content:
        "1.Linh cảm con nào mai lên , em cho vào 1 list , sáng ra nhú lên là em phang , tt đỏ mà nó xanh là em phang gia tăng , còn lên quá 4% là cười nhìn , ko đuổi nữa ",
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id === over?.id || !active || !over) return;

    setTodoList((prev) => {
      const activeIndex = prev.findIndex((object) => object.id === active.id);
      const overIndex = prev.findIndex((object) => object.id === over.id);
      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <ul className="mt-6">
        <SortableContext
          items={todoList}
          strategy={horizontalListSortingStrategy}
        >
          <Masonry columnsCount={4}>
            {todoList.map((val, idx) => (
              <Todo
                key={idx}
                id={val.id}
                content={val.content}
                title={val.title}
              />
            ))}
          </Masonry>
        </SortableContext>
      </ul>
    </DndContext>
  );
}

export default StickyNote;
