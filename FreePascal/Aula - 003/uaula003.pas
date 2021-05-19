unit uAula003;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls;

type

  { TfmrAula003 }

  TfmrAula003 = class(TForm)
    btnProcessa: TButton;
    Memo1: TMemo;
    procedure btnProcessaClick(Sender: TObject);
  private

  public

  end;

var
  fmrAula003: TfmrAula003;

implementation

{$R *.lfm}

{ TfmrAula003 }

procedure TfmrAula003.btnProcessaClick(Sender: TObject);
var
  cNome : string;
  nIdade : integer;
  lMaiordeIdade: boolean;
begin
  cNome := 'Luiz';
  nIdade:= 5;
  Memo1.Lines.Add('Nome: ' + cNome + ' | Idade= ' + IntToStr(nIdade));
  if nIdade >= 18 then
     Memo1.Lines.Add(cNome + ' é maior de idade!')
  else
     Memo1.Lines.Add(cNome + ' é menor de idade!');
end;

end.

