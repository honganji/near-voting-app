import React from "react";
import CandidateCard from "../component/candidate_card";

// home screen(you can vote here)
const Home = () => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {/* <CandidateCard CID="QmTGtuh3c1qaMdiBUnbiF9k2M3Yr4gZn8yixtAQuVvZueW" name="Tonny" manifest="Be yourself; everyone else is already taken." />
            <CandidateCard CID="QmTDNG3eS97Xst7bUzwzGCQay6ML9rE7YowRdituuN6ugX" name="john" manifest="Two things are infinite: the universe and human stupidity; and I'm not sure about the universe." />
            <CandidateCard CID="QmSB1tTBduhwtR7QtRfYPF83xpvJS5VVMHb143Mkfhc9aZ" name="kim" manifest="A room without books is like a body without a soul." />
            <CandidateCard CID="QmbBnhKMuYB3R64aiENhnHzD3amqtVw7n5fgW3XewhvreV" name="kinnikunn" manifest="Be the change that you wish to see in the world." /> */}
            <CandidateCard URI="https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg" name="Tony" manifest="Be yourself; everyone else is already taken." />
            <CandidateCard URI="https://www.thehandbook.com/cdn-cgi/image/width=600,height=600,fit=cover,q=85/https://files.thehandbook.com/uploads/2020/08/60294068-1903365956430333-2915875747048456192-n.jpg" name="Kinni-kun" manifest="Be the change that you wish to see in the world." />
            <CandidateCard URI="https://upload.wikimedia.org/wikipedia/commons/7/75/220624_%EB%B0%A9%ED%83%84%EC%86%8C%EB%85%84%EB%8B%A8_%EB%B7%94%281%29.jpg" name="Kim Teahyong" manifest="A room without books is like a body without a soul." />
            <CandidateCard URI="https://i.ytimg.com/vi/DEuWzXGZWYA/maxresdefault.jpg" name="Ronald McDonald" manifest="You only live once, but if you do it right, once is enough." />
            <CandidateCard URI="https://media.wired.com/photos/59335d07a4b3d04a47189eaa/master/pass/GOT-game-of-thrones-32826622-1280-848.jpg" name="Robb Stark" manifest="In three words I can sum up everything I've learned about life: it goes on." />
        </div>

    )
}
export default Home;