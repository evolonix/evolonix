import { Button, Divider } from '../../../components/catalyst';
import { Character } from '../../../lib/data-access';

interface CharacterDetailsProps {
  character: Character;
  onEdit: () => void;
  onDelete: () => void;
}

export const CharacterDetails = ({ character, onEdit, onDelete }: CharacterDetailsProps) => {
  return (
    <>
      <header className="mb-2 bg-zinc-100 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold">{character.name}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
          </div>
        </div>
        <Divider />
      </header>

      <div id="lipsum" className="grow overflow-y-auto text-justify">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar sem in fringilla vestibulum. Sed hendrerit pharetra orci,
          sed pulvinar nisl dapibus sit amet. Suspendisse vitae sem dolor. Morbi tincidunt ipsum eget odio elementum viverra. Quisque
          pulvinar, risus in ultricies ullamcorper, mi est fringilla libero, non luctus lacus magna nec risus. Sed et nisi a mi imperdiet
          lobortis molestie eget mauris. Praesent laoreet interdum nulla, ut varius ipsum dignissim a. Vestibulum ut pellentesque dui. Ut
          sit amet efficitur augue, ac auctor mi. Duis metus enim, viverra elementum sem quis, dapibus lobortis arcu. Vestibulum tempor
          risus et massa finibus pulvinar.
        </p>
        <p>
          Vivamus in erat risus. Ut nunc risus, convallis eu arcu et, volutpat consequat ex. Aliquam quis auctor risus. Cras elementum orci
          eget est ullamcorper, a pellentesque nunc suscipit. Aenean porttitor, enim auctor porttitor accumsan, ipsum sapien aliquet orci,
          ultricies placerat arcu nibh quis nisl. Sed eleifend ex ut consequat mollis. Fusce nec lorem placerat diam blandit faucibus a
          venenatis odio. Nam neque sapien, efficitur nec enim vel, mattis feugiat diam. Aliquam posuere a risus a hendrerit. Suspendisse id
          turpis sagittis, tincidunt nulla eget, dapibus enim.
        </p>
        <p>
          Integer sit amet ligula vitae sem sodales sollicitudin. Pellentesque efficitur et metus at viverra. Curabitur magna lacus, sodales
          sit amet rutrum ac, molestie a nunc. Sed euismod lobortis neque id hendrerit. Curabitur feugiat bibendum est, ac dapibus sapien
          laoreet nec. Aliquam nec accumsan leo. Donec ornare tristique nulla, in feugiat risus euismod sit amet. Pellentesque sed aliquam
          neque. Donec elit lacus, placerat eu interdum vel, porttitor a elit. Aenean ut neque velit. Sed odio metus, dictum nec enim sed,
          luctus sollicitudin lorem. Etiam lobortis quam et lacinia blandit. Praesent et pellentesque magna, sit amet porttitor dui.
          Curabitur non mi metus. Pellentesque ornare molestie dictum. Donec ultrices blandit purus sed pulvinar.
        </p>
        <p>
          Cras auctor, felis at auctor scelerisque, ex leo consequat lectus, sit amet bibendum dui nunc ut velit. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porta feugiat iaculis. Donec finibus elementum sem et
          luctus. Praesent ut sem mi. Duis tempus at nunc mollis fermentum. Integer eu placerat dolor. Integer facilisis enim lacus. Aliquam
          nec consectetur quam. Suspendisse eros risus, ultricies eu commodo commodo, auctor at urna. Praesent placerat felis at dui
          pulvinar, ut suscipit urna tincidunt. Integer eget sapien et erat aliquam sodales eget id justo. Cras malesuada fermentum rhoncus.
          Fusce est neque, aliquet nec velit a, consequat porta quam. Vivamus pellentesque tortor nec nunc volutpat, vitae suscipit purus
          interdum.
        </p>
        <p>
          Cras sodales eleifend neque, vel consectetur ex blandit sed. In hac habitasse platea dictumst. Nam risus diam, hendrerit eu
          ullamcorper quis, sollicitudin et ipsum. Quisque hendrerit dictum felis, sed viverra magna eleifend ac. Cras blandit commodo eros,
          eget finibus justo feugiat ut. In vitae mi at lacus porta varius. Vivamus at sapien urna. Donec feugiat pharetra felis.
          Pellentesque et risus at libero mattis dapibus at eu mi. Nulla semper leo sit amet volutpat posuere. Suspendisse quis tempor enim,
          sed faucibus lorem. Suspendisse vulputate ornare eros sed eleifend. Suspendisse commodo tellus dui. Proin vulputate mattis
          suscipit. Praesent in hendrerit velit.
        </p>
      </div>
    </>
  );
};

export const CharacterDetailsSkeleton = () => {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <h2 className="h-7 w-full animate-pulse rounded-full bg-zinc-900 font-bold sm:max-w-52 dark:bg-zinc-100">&nbsp;</h2>
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>Edit</Button>
        <Button disabled>Delete</Button>
      </div>
    </div>
  );
};
