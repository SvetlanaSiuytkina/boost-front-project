import { Box, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { TopBar } from '../components/TopBar/TopBar';
import { AchievementForm, AchievementPreview } from '../components/AchievementCreate';
import { useBoostPage } from '../hooks/useBoostPage';

export const CreateAchievementPage = () => {
  const navigate = useNavigate();
  const { handleCreate } = useBoostPage();
  const [searchValue, setSearchValue] = useState('');

  const handleClose = () => {
    navigate('/boost');
  };

  return (
    <Box color="primary.text" bg="background" minH="100vh">
      <Sidebar />
      <Box ml="260px" width="calc(100% - 260px)">
        <TopBar searchValue={searchValue} onSearchChange={setSearchValue} />

        <Box pt={8} pb={8} px={6}>
          <Box maxWidth="container.xl" width="100%" mx="auto">
            <Box mb={8}>
              <Heading size="xl" color="primary.text" mb={1}>
                Создание ачивки
              </Heading>
              <Text color="secondary.text">
                Заполните название и описание, выберите изображение и проверьте предпросмотр
              </Text>
            </Box>

            <AchievementForm
              onSubmit={handleCreate}
              onClose={handleClose}
              searchQuery={searchValue}
              renderPreview={(state) => (
                <AchievementPreview
                  name={state.name}
                  description={state.description}
                  iconSrc={state.icon}
                  iconColor={state.iconColor}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};